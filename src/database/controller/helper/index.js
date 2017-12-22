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
  },

  getSqlDateTime: (dateObject) => {
    let year, month, day, hours, minutes, seconds;
    year = String(dateObject.getFullYear());
    month = String(dateObject.getMonth() + 1);
    if (month.length == 1) {
      month = "0" + month;
    }
    day = String(dateObject.getDate());
    if (day.length == 1) {
      day = "0" + day;
    }
    hours = String(dateObject.getHours());
    if (hours.length == 1) {
      hours = "0" + hours;
    }
    minutes = String(dateObject.getMinutes());
    if (minutes.length == 1) {
      minutes = "0" + minutes;
    }
    seconds = String(dateObject.getSeconds());
    if (seconds.length == 1) {
      seconds = "0" + seconds;
    }
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
};
