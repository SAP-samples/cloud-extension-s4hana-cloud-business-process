# DISCLAIMER
This mission is originally developed using SAP Event Mesh service which is only supported as CPEA service. Its sucessor service **SAP Integration Suite, advanced event mesh** is rolled out as BTPEA service (For more details on CPEA and BTPEA please visit (Consumption-Based Commercial Model)[https://help.sap.com/docs/btp/sap-business-technology-platform/what-is-consumption-based-commercial-model], for comparision of SAP Event Mesh and SAP Integration Suite Advanced Event Mesh please visit (this blog)[https://community.sap.com/t5/technology-blogs-by-sap/sap-integration-suite-advanced-event-mesh-vis-%C3%A0-vis-sap-event-mesh-and-sap/ba-p/13531535]).  Hence the mission will only work with SAP Event Mesh.

# Extensibility on SAP Business Technology Platform

You can easily build extension applications on SAP Business Technology Platform to **extend and enhance SAP solutions without disrupting core processes**. It’s easy to integrate your systems, set up communication between them and SAP Business Technology Platform so you can start building cloud-native extensions quickly and concentrate all your efforts on developing the new logic.

The SAP Business Technology Platform extensions concept provides:

- Standard connections to SAP backend systems/LoBs
- Ease of discovery and consumption of **APIs and events**
- Central **event bus** for all event sources (SAP Event Mesh)

The Extensibility services are fully integrated in the SAP Business Technology Platform Cockpit where you can register your SAP S/4HANA Cloud systems (release 1905 and higher). They support extension applications that run on Cloud Foundry runtime (not Neo). We will use the SAP S/4HANA Cloud Extensibility service available from the SAP Business Technology Platform Service Marketplace.

# Steps

Following the how-to guides provided, you will:

1. Check on the **prerequisites**
2. **Register your SAP S/4HANA Cloud backend** (release 1905 or higher) on the SAP Business Technology Platform
3. Set up service plan **entitlements** (SAP S/4HANA Cloud Extensibility and SAP Event Mesh) for your newly registered system from your SAP Business Technology Platform subaccount
4. Create **service instances** of the SAP S/4HANA Cloud Extensibility service 
5. **Configure events** in your SAP S/4HANA Cloud system to send Business Partner Created and Business Partner Changed events to SAP Event Mesh
6. Create an **SAP Event Mesh service instance** to receive Business Partner events from SAP S/4HANA Cloud system
7. *Deploy* the extension application on the SAP Business Technology Platform. The extension app can be used to track new and changed Business Partners as updates are made in the underlying SAP S/4HANA Cloud system.

# Prerequisites

The following prerequisites need to be fulfilled / below steps are expected to have been performed before being able to execute the main steps of this mission:

- SAP S/4HANA Cloud system (release 1905 or higher)

Please make sure you have the following roles assigned to your user in the SAP S/4HANA
Cloud system:

    SAP_BR_ADMINISTRATOR (Administrator)

    SAP_BR_BPC_EXPERT (Configuration Expert) including catalogs 
        
        SAP_CORE_BC_XBE (Enterprise Event Enablement) and 
        SAP_CORE_BC_COM (Communication Management)  
    
    BR_BUPA_MASTER_SPECIALIST (Master Data Specialist - Business Partner Data)
    
    BR_EMPLOYEE (Employee)

- SAP Business Technology Platform Cloud Foundry global account (trial accounts are not supported)
- SAP Business Technology Platform subaccount created
- SAP Business Technology Platform space created




