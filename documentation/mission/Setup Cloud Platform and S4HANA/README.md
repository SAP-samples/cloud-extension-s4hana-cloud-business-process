# Setup Connectivity and Extensibility

## Register Your SAP S/4HANA Cloud System

> **Note**
> Below step has been performed centrally, no action from participants required.

To build extension applications for your SAP S/4HANA Cloud system, you need to connect your SAP S/4HANA Cloud system to your SAP Business Technology Platform global account.

To be able to do this, in respect to authorizations you must be: 

- an administrator of the SAP Business Technology Platform global account 

- an administrator of the SAP S/4HANA Cloud system. 

### SAP Business Technology Platform

> **Note**
> Below step has been performed centrally, no action from participants required.

1. In your SAP Business Technology Platform Cockpit, open your global account and choose
*Systems*.

2. In the Systems Landscape, choose *Add System*.


 ![Register System](./images/setup1.png)


3. In the *Register System* dialog box, enter a name for the SAP S/4HANA Cloud system you want to connect.

- Recommendation: use a name that uniquely identifies this system, for example, system ID.
- Example: >S/4HANA Cloud system name<

4. In the Type dropdown list, choose *SAP S/4HANA Cloud*.

5. Choose *Add*.

 ![Choose Add](./images/setup2.png)

6. The SAP Business Technology Platform generates an integration token so the SAP S/4HANA Cloud system administrator can configure integration with the SAP BTP from your SAP S/4HANA Cloud system. Select the communication scenario groups from the drop down. Click on *get Token*.

 ![Get Token](./images/setup3.2.png)

7. Copy the integration token and close the dialog box.

 ![Token](./images/setup3.png)

### SAP S/4HANA Cloud

> **Note**
> Below step has been performed centrally, no action from participants required.

1. Log onto your SAP S/4HANA Cloud tenant.

2. Navigate to *Home -> Communication Management* tab and choose the tile *Maintain Extensions on SAP BTP*.

 ![Maintain](./images/setup4.png)

3. On the *Maintain Extensions on SAP BTP* screen in the Integration section, choose *New*.

 ![New](./images/setup5.png)

4. In the Integration Token field, paste in the integration token generated and copied from the SAP Business Technology Platform.

 ![Paste](./images/setup6.png)

5. Enter a description for your system integration token.

- Recommendation: use the same name you entered in SAP Business Technology Platform when you generated the token.
- Example: >S/4HANA Cloud system name<

6. Choose *Save*.

- A new entry is displayed for your system in the table with the status *Enabling*.
- Wait for a few seconds.
- After the automated integration, the status of your system integration changes to *Enabled*.
- The same takes place on the SAP Business Technology Platform side. You will see the system as *Registered* – potentially after a quick refresh.


## Set Up Entitlements for Your Subaccount

> **Note**
> Below step has been performed centrally, no action from participants required.

After you have connected the SAP S/4HANA Cloud system (with status *Enabled* in your SAP S/4HANA Cloud tenant) to the SAP Business Technology Platform, you need to configure entitlements to make this system accessible in the SAP Business Technology Platform subaccount in which you want to build your extension application.

In the next steps you will configure the entitlements and assign the corresponding quota and service plans to the subaccount in which the extension application will reside.

Hint: Please note that as a prerequisite both a subaccount with Cloud Foundry enabled and a space need to have been created. In case you have not created a subaccount or a space yet, follow the instructions given in the documentation. 

So in case that you have no subaccount in place you would roughly have to follow these steps:

1. Create a Subaccount

2. Enable Cloud Foundry

3. Create a Space

Detailed Instructions can be found here:

https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/05280a123d3044ae97457a25b3013918.html?q=subaccount

https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/2f6ed22ccf424dae84345f4500c2d8ea.html

### SAP Business Technology Platform

> **Note**
> Below step has been performed centrally, no action from participants required.

1. In your SAP Business Technology Platform Cockpit, open your global account and choose *Entitlements --> Entity Assignments*.

 ![CP Cockpit](./images/setup7.png)


2. In the Select Entities dropdown list, type or select your subaccount, choose select and then GO.
 
3. Choose *Configure Entitlements* and then *Add Service Plans*.

 ![Add Service Plans](./images/setup8.png)


4. In the Subaccount Entitlements dialog box, select the service *SAP S/4HANA Cloud Extensibility*

 ![Select Extensibility](./images/setup9.png)


5. In the *Service Details: SAP S/4HANA Cloud Extensibility* screen area, select your newly registered system name from the dropdown help to list the available service plans. These available service plans are:

- *messaging* to consume SAP S/4HANA Cloud events and create event-based extensions using the event bus from SAP Event Mesh
- *api-access* for generic access to SAP S/4HANA Cloud APIs

 ![Service Details](./images/setup10.png)


6. Select both service plans and press the *Add 2 Service Plans* button to add these entitlements for the SAP S/4HANA Cloud Extensibility service for your SAP S/4HANA Cloud system registered to your subaccount.

7. Press *Save*.

 ![Press Save](./images/setup11.png)



**Set up your subaccount entitlement for SAP Event Mesh**

> **Note**
> Below step has been performed centrally, no action from participants required.

1. Click on *Configure Entitlements* and then on *Add Service Plan*

2. In the *Subaccount Entitlements* dialog box, select the service *Event Mesh*


 ![EM Service](./images/setup12.png)



3. In the *Service Details: Event Mesh screen area*, select the *default* service plan

4. Press the *Add 1 Service Plan* button to add this entitlement for the Event Mesh service for your subaccount.

5. Press *Save*.




**Set up your subaccount entitlement for Cloud Foundry Runtime**

> **Note**
> Below step has been performed centrally, no action from participants required.

1. Click on *Configure Entitlements* and then on *Add Service Plan*.

2. In the *Subaccount Entitlements* dialog box, select the service *Cloud Foundry Runtime*

 ![AR](./images/setup13.png)


3. In the *Service Details: Cloud Foundry Runtime* screen area, select the following service plan:

- MEMORY

4. Press the *Add 1 Service Plan* button to add this entitlement for the Cloud Foundry Runtime service for your subaccount.

5. Press *Save*.

**Check**

Your activities should result in a screen like this:

 ![Screen](./images/setup14.png)



# Create Service Instances of SAP S/4HANA Cloud Extensibility Service with Service Plans

To allow SAP Business Technology Platform applications to consume events and APIs from SAP S/4HANA Cloud, you need to create the relevant service instances of SAP S/4HANA Cloud Extensibility for the service plans *api-access* and *messaging*.

**SAP BTP Cockpit:** Create a new service instance of SAP S/4HANA Cloud Extensibility with service plan *“messaging”* for enterprise eventing integration

1. Go to your subaccount.

2. Go to the Service Marketplace and click on *SAP S/4HANA Cloud Extensibility*

 ![Marketplace](./images/setup15.png)


3. Click on *Create*.

 ![Instance](./images/setup16.png)

4. In the Create wizard in the Plan dropdown list, select the service *SAP S/4HANA Cloud Extensibility* with plan *messaging*. Choose a CLI friendly name for your instance (e.g. *georelmessaging*).

> **Note**
> Since a single subaccount is shared among all participants, please use `georelmessaging_(your D number)` (e.g. georelmessaging_d049740) as the name of instance. In addition, in below screenshot, please choose the registered **PMLearning_S/4HANA Cloud system** for System Name dropdown list.

 ![Plan](./images/setup17.png)
 
5. Click *Next*

6. In the Specify Parameters dialog box, use the following template, which should have
been prefilled for you.

- The *emClientId* you can freely choose following the conventions - unless it is already in use - and according to the conventions it must contain between 1 and 4 alphanumeric characters (a-z, A-Z, 0-9). Use for example your birthday (e.g. *1908*).
- For more information, check on help.sap.com: https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/2d50d91f0d684bba98d323e9f4258cda.html

``` 
{

"emClientId": "<Add your emClientId here>", 
  
"systemName": "<S/4HANA Cloud system name>"

}
``` 

> **Note**
> The **systemName** has been registered in earlier step, please use `S4HANACloud_PM_my304263` as value for above JSON file.

 ![Parameters](./images/setup20.png)


7. Click *Create*. The newly created instance appears in the list of instances in the Instance panel.

**SAP Business Technology Platform Cockpit:** Create a new service instance of SAP S/4HANA Cloud Extensibility with service plan *api-access* to access the BusinessPartner API and enable its usage

1. Go to your subaccount.

2. Go to the Service Marketplace and click on SAP S/4HANA Cloud Extensibility

3. Click on *Create*.

4. In the *Create wizard* in the Service dropdown list, select the service *SAP S/4HANA Cloud Extensibility*.

5. Select the Service Plan *api-access*, which you use for generic access to APIs in your SAP S/4HANA Cloud system.

   Use **xf_api_bupa_(d number)** for your instance name, e.g. `xf_api_bupa_d049740`. In addition, in below screenshot, please choose the registered **PMLearning_S/4HANA Cloud system** for System Name dropdown list.



 ![Instance](./images/setup21.png)

6. Click Next

7. In the Specify Parameters dialog box, you need to copy the template below and paste it into that box – replacing the content filled in there automatically

 ![Bupa](./images/setup22.png)

8. Copy the template below (please watch for line breaks)

- As “systemName” you must enter the name of your newly registered system. The system name should be prefilled in the content you are replacing - so you can just copy it to an editor before and the just copy it back into the template.
- As “communicationArrangementName” you must enter a speaking name for your communication arrangement. 

> **Note**
> The **communicationArrangementName** can be `BTP_BUSINESS_PARTNER_PM_(D number)`(e.g. `BTP_BUSINESS_PARTNER_PM_D049740`)

```
{
    "systemName": "<SYSTEM NAME>",
    "communicationArrangement": {
        "communicationArrangementName": "<ARRANGEMENT NAME>",
        "scenarioId": "SAP_COM_0008",
        "inboundAuthentication": "BasicAuthentication",
        "outboundAuthentication": "BasicAuthentication",
        "outboundServices": [
            {
                "name": "Replicate Customers from S/4 System to Client",
                "isServiceActive": false
            },
            {
                "name": "Replicate Suppliers from S/4 System to Client",
                "isServiceActive": false
            },
            {
                "name": "Replicate Company Addresses from S/4 System to Client",
                "isServiceActive": false
            },
            {
                "name": "Replicate Workplace Addresses from S/4 System to Client",
                "isServiceActive": false
            },
            {
                "name": "Replicate Personal Addresses from S/4 System to Client",
                "isServiceActive": false
            },
            {
                "name": "Business Partner - Replicate from SAP S/4HANA Cloud to Client",
                "isServiceActive": false
            },
            {
                "name": "Business Partner Relationship - Replicate from SAP S/4HANA Cloud to Client",
                "isServiceActive": false
            },
            {
                "name": "Business Partner - Send Confirmation from SAP S/4HANA Cloud to Client",
                "isServiceActive": false
            },
            {
                "name": "BP Relationship - Send Confirmation from SAP S/4HANA Cloud to Client",
                "isServiceActive": false
            }
        ],
        "communicationSystem": {
            "communicationSystemHostname": "default.com",
            "outboundCommunicationUser": {
                "username": "DefaultUser",
                "password": "DefaultPassword"
            }
        }
    }
}
```

For more information, check:

https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/553a4c6b98be4c1ba7d1dfa0e9df8669.html

8. Choose Next.

9. Click *Create*.


The newly created instance appears in the list of instances in the Instance panel.

 ![Instance Appears](./images/setup23.png)


# Manage Your Solution for Event Handling in SAP S/4HANA Cloud System

You need to enable the events that are to be sent from your SAP S/4HANA Cloud system to SAP Business Technology Platform. For this enablement step, go to your SAP S/4HANA system.


**SAP S/4HANA Cloud: Maintain Event Topics in the Enterprise Event Enablement app**

Find additional information here:

https://help.sap.com/viewer/7dde0e0e3a294f01a6f7870731c5e4ad/SHIP/en-US/1aafa0717c08461ba05ee846caec46b7.html

1. Log onto your SAP S/4HANA Cloud system

2. Go to Enterprise Event Enablement (Configure Channel Binding)


 ![Event Enablement](./images/setup24.png)


3. Click Go

4. Select your event channel from the list

Hint: Look for your emClientId that you had provided in an earlier step. 


 ![Event Channel](./images/setup25.png)


5. Click Create for your Outbound Topic


 ![Outbound Topic](./images/setup26.png)


6. Click on the Topic selector

7. Enter asterisk BusinessPartner asterisk into the Topic Filter


 ![Business Partner](./images/setup27.png)


8. Click Go

9. Select sap/s4/beh/businesspartner/v1/BusinessPartner/*


 ![Select BP](./images/setup28.png)


10. Click *Create*.

# Create Event Mesh Instance

**SAP Business Technology Platform:** Create a new service instance for SAP Event Mesh

When you create a new service instance for SAP Event Mesh, you create a new messaging client, which then receives events sent from your registered SAP S/4HANA Cloud system. The parameters you enter in the JSON file are the service descriptors that are later visible on the Messaging Client UI and dictate the rules to be used for creating queues and their subscriptions.

1. Go to the SAP Business Technology Platform Cockpit.

2. Open your subaccount.

3. In the Navigation area, choose *Services* --> *Service Marketplace*

4. Choose the *Event Mesh* tile.


 ![EM Tile](./images/setup29.png)


5. Click on *Create*.

6. Select *Event Mesh* from the Service Drop Down

7. Select *default* from the Service Plan Drop Down

8. Enter the *Instance Name:* use *messaging_georel_(D number)* (e.g. `messaging_georel_d049740`) for the instance name


 ![Instance Name](./images/setup30.png)


9. Click *Next*

10. Copy the template into the parameter field and adjust relevant data:

- Line 3: emname: EMGeo_(D number)
- Line 4: The number at the end of `sap/georelations/1` (in this case **1**) needs to be unique for each participant. We will distribute the number during the course.
- Line 11 and 16: namespace

Hint: for the namespace you will most likely just have to exchange the 4 digit number to the number of your choice that you had entered for the emClientId in an earlier step. So you would have to replace 1908 in the example below with the 4 characters you chose for the emClientId. 

Example:

```
{

"emname": "EMGeo",
"namespace": "sap/georelations/1", "version": "1.1.0",
"options": {
"management": true, "messagingrest": true, "messaging": true
}, "rules": {
"queueRules": { "publishFilter": [
"${namespace}/*"
], "subscribeFilter": [
"${namespace}/*", "sap/S4HANAOD/1908/*"
] },
"topicRules": { "publishFilter": [
"${namespace}/*"
], "subscribeFilter": [
"${namespace}/*", "sap/S4HANAOD/1908/*"
] }

} 
}
```

In case of it being unclear what namespace to use you can look it up in the SAP S/4HANA Cloud system. Go to the event channel configuration as described above in the S/4 configuration section and find the relevant topic space there.

11. Click on *Create*.

12. Once the instance has been created you can check on it in the SAP Business Technology Platform Cockpit


![Instance CP Cockpit](./images/setup31.png)


# Enable Event Mesh Cockpit (Optional)

In case that you would like to access the Event Mesh Cockpit, you need to subscribe to SAP Event Mesh and assign a number of roles to your user.

Hint: There is no need to access the SAP Event Mesh Cockpit in this scenario, it would allow for a better understanding though. Plus that it allows you to explore the event format etc.

1. Subscribe to Event Mesh

- Select *Subaccount*
- Select *Service Marketplace* → *Event Mesh* → *Create*


![Subscribe to EM](./images/setup32.png)

Hint: You can either click on the tile and select *Create* or select *Create* from the menu of the tile

Note: If you don't see the Event Mesh tile or the Subscription option, get in contact with the administrator of the Global Account or check whether the plan standard has been assigned to the entitlement of event mesh standard plan has been assigned or not.

2. Go through the subscription process and select *standard* Subscription from the list


![Click](./images/setup33.png)


Once the subscription is completed you'll find additional Role Collections for Event Mesh available in your subaccount.
 
3. Assign newly created role collections to your users

- Select *Subaccount*
- Select *Security* → *Role Collections*
- Click on the right arrow button in the "Enterprise Messaging Developer":
 
![Role Collection](./images/setup37.png) 

4. Click on Edit

![Role Collection](./images/setup38.png) 

5. Go to users tab and enter the email of the user and click on **+** sign.

Repeat this for every user that needs to have access, then click **Save** button.

6. Click on your subaccount

7. Select the *Instances and Subscriptions* tab

8. Click on the three dots under subscriptions and behind your application

9. Select *Go to Application*

![Confirm](./images/setup35.png)

10. Go to the Event Mesh Cockpit and confirm it works




























