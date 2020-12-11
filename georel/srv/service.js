"use strict";

cds = require('@sap/cds')

const uuidv4 = require('uuid/v4');
const { BusinessPartner, BusinessPartnerRole, BusinessPartnerAddress, AddressPhoneNumber, AddressEmailAddress }
    = require('@sap/cloud-sdk-vdm-business-partner-service')

const RELEVANT_COUNTRY = process.env.RELEVANT_COUNTRY || 'US'
const RELEVANT_ROLE = 'FLCU01'

const NAMESPACE = 'sap/S4HANAOD/1908'
const CREATED = 'ce/sap/s4/beh/businesspartner/v1/BusinessPartner/Created/v1'
const CHANGED = 'ce/sap/s4/beh/businesspartner/v1/BusinessPartner/Changed/v1'

const TOPIC_CREATED = NAMESPACE + '/' + CREATED
const TOPIC_CHANGED = NAMESPACE + '/' + CHANGED

const STATUS = {
    KICK_OFF: 1,
    OK: 2,
    FOLLOW_UP: 3,
    CRITICAL: 4,
    CLOSED: 5
}

module.exports = cds.service.impl((srv) => {

    const { CustomerProcesses } = cds.entities

    srv.on(TOPIC_CREATED, async (msg) => {
        
        let bupaId = msg.data.BusinessPartner;

        console.log('==> [MSG] handler: received S4 Event: BuPa Created (Relevant country: ' + RELEVANT_COUNTRY + ')' + ' ID: ' + bupaId)

        // call S4H system using SAP CLoud SDK
        const result = await _callS4H(bupaId)
        console.log('    Successfully back from S4 system: ' + JSON.stringify(result));

        if (! await _bupaExists(bupaId, CustomerProcesses)) {
            // we only consider customers from our region
            if (_isRelevant(result.bupa)) {
                // write to database
                let dbEntry = _composeDbEntry(result, msg.headers)
                _createInDb(CustomerProcesses, dbEntry)
            } else {
                console.log('==> [MSG] handler: received BuPa Created event, but the BuPa is not relevant. Aborting.')
            }
        } else {
            console.log('==> [MSG] handler: received BuPa Created event, but the BuPa already exists in local DB. Aborting.')
        }

    })

    srv.on(TOPIC_CHANGED, async (msg) => {
        
    //let bupaId = msg.data.KEY[0].BUSINESSPARTNER

        let bupaId = msg.data.BusinessPartner;
        
        console.log('==> [MSG] handler: received S4 Event: BuPa Changed' + ' ID: ' + bupaId);
    
        // call S4H system using SAP CLoud SDK
        const result = await _callS4H(bupaId)
        console.log('    [MSG] handler: Successfully called S4 API: ' + JSON.stringify(result));

        // find the entry for the bupaId        
        console.log('    [MSG] handler: Search the changed bupa in local database: ' + result.bupa.businessPartner)
        let foundEntry = await cds.run(SELECT.one.from(CustomerProcesses).where({ customerId: result.bupa.businessPartner }))
        console.log('    [MSG] handler: Found entry in DB for bupa: ' + JSON.stringify(foundEntry))
        if (!foundEntry || !foundEntry.processId) {
            // if we don't have it in our DB yet, then let's just create it                                            
            if (_isRelevant(result.bupa)) {
                console.log('   [MSG] handler: The changed backend bupa not found in local database. So create it')
                let dbEntry = _composeDbEntry(result, msg.headers)
                _createInDb(CustomerProcesses, dbEntry)
                return
            } else {
                console.log('==>   [MSG] handler: BuPa Changed event, BuPa is not relevant. Aborting.')
            }
        } else {
            console.log('    [MSG] handler:The changed bupa is already contained in local DB. So now UPDATE the data in DB for: ' + foundEntry.processId)
            let dbEntry = _composeDbEntry(result, msg.headers, foundEntry)
            _updateInDb(CustomerProcesses, foundEntry.processId, dbEntry)
        }
    })

    // Handler for save of object page. Here we calculate and store the criticality
    srv.before('UPDATE', 'CustomerProcesses', (req) => {
        console.log('==> [UPDATE] before-handler invoked')
        let status = req.data.status_statusId
        if (status) {
            let criticality = _computeCriticality(status)
            req.query.UPDATE.data.criticality = criticality // modify the payload before the generic UPDATE is written to db by FWK
            console.log('==> [UPDATE] handler:  criticality was set to  ' + criticality)
        } else {
            console.log('==> [UPDATE] handler: Staus not changed, nothing to do  ')
        }
    })

})

/** Calls the S4Hana Backend system with the given business partner id, to read the details */
const _callS4H = async function (bupaId) {
    return new Promise((resolve, reject) => {
        BusinessPartner.requestBuilder()
            .getByKey(bupaId)
            .select(
                BusinessPartner.BUSINESS_PARTNER,
                BusinessPartner.CUSTOMER,
                BusinessPartner.FIRST_NAME,
                BusinessPartner.LAST_NAME,
                BusinessPartner.CORRESPONDENCE_LANGUAGE,
                BusinessPartner.TO_BUSINESS_PARTNER_ROLE.select(
                    BusinessPartnerRole.BUSINESS_PARTNER_ROLE
                ),
                BusinessPartner.TO_BUSINESS_PARTNER_ADDRESS.select(
                    BusinessPartnerAddress.BUSINESS_PARTNER,
                    BusinessPartnerAddress.ADDRESS_ID,
                    BusinessPartnerAddress.COUNTRY,
                    BusinessPartnerAddress.CITY_NAME,
                    BusinessPartnerAddress.TO_EMAIL_ADDRESS.select(
                        AddressEmailAddress.EMAIL_ADDRESS
                    ),
                    BusinessPartnerAddress.TO_PHONE_NUMBER.select(
                        AddressPhoneNumber.PHONE_NUMBER)))
            .execute({ destinationName: 'xf_api_bupa' }) // the name of  instance of xf service cds 
            .then((bupa) => {
                if (bupa) {
                    console.log('   [S4H]: called S4H API (via XF) and found the requested BuPa')
                    resolve({ bupa: bupa });
                } else {
                    reject("   [S4H]: ERROR: called S4H API (via XF) but failed to get BusinessPartner in Backend (e.g. not found)")
                }
            }).catch((err) => {
                console.error('   [S4H]: called S4H API (via XF) Tried to find BuPa in S4 system, but request to S4H system failed: ' + err)
            })
    })
}


/** Checks if the given BusinessPartnerID is already contained in local database */
async function _bupaExists(bupaId, CustomerProcesses) {
    console.log('    [findBupa] handler: Search the changed bupa in local database: ' + bupaId)
    let foundEntry = await cds.run(SELECT.one.from(CustomerProcesses).where({ customerId: bupaId }))
    console.log('    [findBupa] Found entry in DB for bupa: ' + JSON.stringify(foundEntry))

    return foundEntry && foundEntry.processId
}

/** checks if the given bupa has to be added to the GEO REL List  */
function _isRelevant(bupa) {
    if (!bupa.toBusinessPartnerRole[0] || bupa.toBusinessPartnerRole[0].length < 1) {
        return false
    }
    if (bupa.toBusinessPartnerRole[0].businessPartnerRole === RELEVANT_ROLE
        && _checkCountry(bupa, RELEVANT_COUNTRY)) {
        return true;
    }
    return false
}

/** checks if the given bupa is located in the given country  */
function _checkCountry(bupa, relevantCountry) {
    let address = bupa.toBusinessPartnerAddress
    return (address && (address.length > 0) && (address[0].country === relevantCountry))
}

/** writes the given entry to database  */
async function _createInDb(CustomerProcesses, dbEntry) {
    console.log('   [INSERT] Now write new Customer to database' + dbEntry.processId)
    const rows = await cds.run(INSERT.into(CustomerProcesses).entries(dbEntry))
    console.log('   [INSERT] Done INSERT to DB. Result row numbers: ' + rows)
}

/** updates the entry with the given processId in the database */
async function _updateInDb(CustomerProcesses, processId, dbEntry) {
    console.log('   [UPDATE] Now update Customer in database: ' + processId)
    let rows = await cds.run(UPDATE(CustomerProcesses).where({ processId: processId }).set(dbEntry))
    console.log('   [UPDATE]: Done UPDATE to DB: ' + dbEntry.customerId + ' Result number of changed rows: ' + rows)
}

function _composeDbEntry(result, event, existingEntry) {
    const addressInfo = _extractAddressInfo(result.bupa)

    const dbEntry = {
        customerName: result.bupa.firstName + ' ' + result.bupa.lastName,
        customerId: result.bupa.businessPartner,
        customerLanguage: result.bupa.correspondenceLanguage,
        customerCountry: addressInfo.country,
        customerCity: addressInfo.city,
        customerMail: addressInfo.email,
        customerPhone: addressInfo.phoneNumber,
        backendEventTime: event.eventTime || new Date().toLocaleString(),
        backendEventType: event.eventType || '-',
        backendEventSource: event.source || '-',
        backendUrl: _computeBackendUrl(result.bupa.businessPartner),
        status_statusId: _computeStatus(existingEntry, addressInfo.country)
    }
    dbEntry.criticality = _computeCriticality(dbEntry.status_statusId)

    if (!existingEntry) {
        //remove uuid
        dbEntry.processId = uuidv4()  // in case of creation
        dbEntry.customerCondition_conditionId = 1 // new
    }

    return dbEntry
}

function _extractAddressInfo(bupa) {
    let country, city, email, phoneNumber

    const address = bupa.toBusinessPartnerAddress && bupa.toBusinessPartnerAddress[0]
    country = address.country
    city = address.cityName
    if (address.toEmailAddress && address.toEmailAddress.length > 0) {
        email = address.toEmailAddress.emailAddress
    }
    if (address.toPhoneNumber && address.toPhoneNumber.length > 0) {
        phoneNumber = address.toPhoneNumber[0].phoneNumber
    }

    return {
        country: country ? country : RELEVANT_COUNTRY,
        city: city ? city : '-',
        email: email ? email : '-',
        phoneNumber: phoneNumber ? phoneNumber : '-'
    }
}

/** maps the give process status to criticality property. This will be used to set color in UI  */
function _computeCriticality(status) {
    switch (status) {
        case STATUS.KICK_OFF:
            return 0;   // grey
        case STATUS.OK:
            return 3;   // green
        case STATUS.FOLLOW_UP:
            return 2;   // yellow
        case STATUS.CRITICAL:
            return 1;   // red
        case STATUS.CLOSED:
            return 0;
        default:
            return 0;
    }
}

/** in some cases, the app automatically sets the status. 
 * e.g. on every BuPa change, the status is set to follow-up. */
function _computeStatus(existingEntry, country) {
    // setting status depends on backend event: created or changed
    if (country !== RELEVANT_COUNTRY) {
        return STATUS.CLOSED
    } else {
        if (existingEntry) {
            //don't change status if critical
            return (existingEntry.status_statusId === STATUS.CRITICAL) ?
                STATUS_CRITICAL : STATUS.FOLLOW_UP
        } else {
            return STATUS.KICK_OFF
        }
    }
}

/** composes the URL of the given  */
function _computeBackendUrl(bupaId) {
    let backendUrl = ''

    try {
        const s4hRootUrl = JSON.parse(process.env.VCAP_SERVICES)['s4-hana-cloud'][0].credentials.URL //"https://my300497-api.s4hana.ondemand.com"
        const path = 'sap/opu/odata/sap'
        const api = 'API_BUSINESS_PARTNER'
        const entitySet = 'A_BusinessPartner'
        backendUrl = s4hRootUrl + '/' + path + '/' + api + '/' + entitySet + '(\'' + bupaId + '\')'
    } catch (error) {
        console.error('   Failed to compute Backend URL. Not critical. Hence ignoring')
    }

    return backendUrl
}
