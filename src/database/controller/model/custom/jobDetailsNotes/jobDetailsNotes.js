function jobDetailNotes(id, notes) {
  return (
    `UPDATE Job SET notes = '${notes}' WHERE job.id = ${id};`
  );
}

export default jobDetailNotes;
