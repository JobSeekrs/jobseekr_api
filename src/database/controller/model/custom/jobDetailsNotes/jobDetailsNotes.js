function jobDetailNotes(id, notes){ 
    return (    
    `UPDATE job
    SET notes = ${notes} 
        WHERE job.id = ${id};`
    )
}    

export default jobDetailNotes;
