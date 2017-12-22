function jobDetailEvents(jobId) {
  return (
    `INSERT INTO Event (jobId, name, type, timestamp) VALUES (${jobId}, 'Update Notes', 'Edit', CURRENT_TIMESTAMP());`
  );
}

export default jobDetailEvents;
