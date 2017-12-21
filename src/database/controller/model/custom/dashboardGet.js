function dashboardGet(userId) { 
  return (
    `SELECT j.id, j.status, j.priority as rating, 
        CAST(j.deadline as DATE) as deadline, j.link as url, 
        j.name as job_title_name, c.name as company_name, 
        MIN(CAST(e.timeStamp as DATE)) as created_date 
      FROM job j 
      INNER JOIN company c on j.companyId = c.id 
      INNER JOIN event e on j.id = e.jobId 
      WHERE c.userId = ${userId} 
      GROUP BY j.id, c.name;`);
}


// return (`SELECT j.id, j.status, j.priority as rating, 
// CAST(j.deadline as DATE) as deadline, j.link as url, 
// j.name as job_title_name, c.name as company_name, 
// MIN(CAST(e.timeStamp as DATE)) as created_date FROM job j 
// INNER JOIN company c on j.companyId = c.id INNER JOIN event e 
// on j.id = e.jobId GROUP BY j.id, c.name;`)
// };

export default dashboardGet;
