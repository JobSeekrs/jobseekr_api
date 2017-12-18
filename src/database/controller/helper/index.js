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
};

