# Extensibility on SAP Cloud Platform

You can easily build extension applications on SAP Cloud Platform to **extend and enhance SAP solutions without disrupting core processes**. It’s easy to integrate your systems, set up communication between them and SAP Cloud Platform so you can start building cloud-native extensions quickly and concentrate all your efforts on developing the new logic.

The SAP Cloud Platform extensions concept provides:

- Standard connections to SAP backend systems/LoBs
- Ease of discovery and consumption of **APIs and events**
- Central **event bus** for all event sources (SAP Cloud Platform Enterprise Messaging)

The Extensibility services are fully integrated in the SAP Cloud Platform Cockpit where you can register your SAP S/4HANA Cloud systems (release 1905 and higher). They support extension applications that run on Cloud Foundry runtime (not Neo). We will use the SAP S/4HANA Cloud Extensibility service available from the SAP Cloud Platform Service Marketplace.

# Steps

Following the how-to guides provided, you will:

1. Check on the **prerequisites**
2. **Register your SAP S/4HANA Cloud backend** (release 1905 or higher) on the SAP Cloud Platform
3. Set up service plan **entitlements** (SAP S/4HANA Cloud Extensibility and SAP Cloud Platform Enterprise Messaging) for your newly registered system from your SAP Cloud Platform subaccount
4. Create **service instances** of the SAP S/4HANA Cloud Extensibility service 
5. **Configure events** in your SAP S/4HANA Cloud system to send Business Partner Created and Business Partner Changed events to SAP Cloud Platform Enterprise Messaging
6. Create an **SAP Cloud Platform Enterprise Messaging service instance** to receive Business Partner events from SAP S/4HANA Cloud system
7. *Deploy* the extension application on the SAP Cloud Platform. The extension app can be used to track new and changed Business Partners as updates are made in the underlying SAP S/4HANA Cloud system.

# Prerequisites

The following prerequisites need to be fulfilled / below steps are expected to have been performed before being able to execute the main steps of this mission:

- SAP S/4HANA Cloud system (release 1905 or higher)

Please make sure you have the following roles assigned to your user in the SAP S/4HANA
Cloud system:

    SAP_BR_ADMINISTRATOR (Administrator)

    SAP_CORE_BC_COM (Communication Management) 

    SAP_BR_BPC_EXPERT

- SAP Cloud Platform Cloud Foundry global account (trial accounts are not supported)
- SAP Cloud Platform subaccount created
- SAP Cloud Platform space created




