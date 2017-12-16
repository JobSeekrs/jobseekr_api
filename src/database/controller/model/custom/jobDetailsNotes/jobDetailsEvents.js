function jobDetailEvents(jobId){ 
    return 
        (    
        `INSERT INTO event 
        (jobId, name, type, timestamp) 
        VALUES (${jobId}, 'Update Notes', 'Edit', CURRENT_TIMESTAMP());`
        )
}
    
export default jobDetailEvents;
