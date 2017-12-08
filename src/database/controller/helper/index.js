export default {
  where: (queryString) => {
    let pairs = [];
    Object.keys(queryString).forEach(key => {
      pairs.push(`${key} = ${queryString[key]}`)
    });
    const sql = 'WHERE ' + pairs.join(' AND ');
    return sql;
  }
}

