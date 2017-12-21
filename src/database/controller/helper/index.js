import { log, debug } from '../../../'

export default {
  where: (queryString) => {
    const pairs = [];
    Object.keys(queryString).forEach((key) => {
      pairs.push(`${key} = '${queryString[key]}'`)
    });
    const sql = pairs.join(' AND ');
    return sql;
  },
  insertOne: (table, object) => {
    const cols = Object.keys(object).join(', ');
    const values = `"${Object.values(object).join('", "')}"`;
    const sql = `INSERT INTO ${table} (${cols}) VALUES (${values});`;
    debug('SQL', sql);
    return sql;
  }
};
