
-- JOB DETAIL GET
SELECT 
    j.id as job_id, 
    j.description as job_description, 
    j.notes as job_notes, 
    j.source as job_source,

    e.id as event_id, 
    e.jobId, e.contactId, 
    e.name as event_name, 
    e.notes as event_notes, 
    e.type as event_type,
    e.dueDate as event_duedate, 
    e.timeStamp as event_timestamp, 
    e.notifyOn as event_notifyOn, 
    e.notificationType as event_notification_type, 
    
    cont.id as contact_id, cont.userId, cont.companyId, 
    cont.firstName as contact_first_name, 
    cont.lastName as contact_last_name,
    cont.title as contact_title, 
    cont.notes as contact_notes, 
    cont.email as contact_email,
    cont.phone as contact_phone,
    
    comp.id, 
    comp.name as company_name, 
    comp.description as company_description,
    comp.notes as company_notes,
    comp.phone as company_phone,
    comp.address1 as company_address1,
    comp.address2 as company_address2,
    comp.city as company_city,
    comp.state as company_state,
    comp.zip as company_zip

        FROM Job j
    INNER JOIN Event e
        on j.id = e.jobId 
    INNER JOIN Contact cont
        on e.jobId = cont.id 
    INNER JOIN Company comp 
        on comp.id = cont.companyId
    WHERE j.id = 104;

