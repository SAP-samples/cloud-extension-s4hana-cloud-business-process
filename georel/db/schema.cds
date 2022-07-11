namespace com.example.business;

using { sap.common.CodeList } from '@sap/cds/common';

    entity CustomerProcesses {
        key processId : UUID;
        customerName : String(40);
        customerId : String(10);
        customerPhone : String;
        customerLanguage : String;
        customerCountry: String;
        customerMail : String;
        customerCity : String;
        comment : String(1111) default 'initial';
        criticality : Integer default 1;
        backendEventTime : String;
        backendUrl: String;
        backendEventType : String;
        backendEventSource : String;
        status : Association to Status;
        customerCondition : Association to Conditions;
    };
    
    entity Conditions : CodeList {
        key conditionId : Integer;
    }

    entity Status : CodeList {
        key statusId : Integer;
    }

