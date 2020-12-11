using com.example.business as db from '../db/schema';

service GeorelService{
  
  @odata.draft.enabled
  entity CustomerProcesses as projection on db.CustomerProcesses;
  entity Conditions @readonly as projection on db.Conditions;
  entity Status @readonly as projection on db.Status;
};
