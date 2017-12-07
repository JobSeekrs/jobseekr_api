import { database } from './../';

function where(queryString) {
  let pairs = [];
  Object.keys(queryString).forEach(key => {
    pairs.push(`${key} = ${queryString[key]}`)
  });
  const sql = 'WHERE ' + pairs.join(' AND ');
  return sql;
}

const model = {
  company : {
    getAll: (callback) => {
      const sql = `SELECT * FROM company`;
      database.query(sql, (err, data) => {
        callback(err, data);
      });
    },
    get: (id, callback) => {
      const sql = `SELECT * FROM company WHERE id=${id}`;
      database.query(sql, (err, data) => {
        callback(err, data);
      });      
    },
    query: (queryString, callback) => {
      const sql = `SELECT * FROM company ${where(queryString)}`;
      database.query(sql, (err, data) => {
        callback(err, data);
      });       
    },
  },
  contact : {
    getAll: (callback) => {
      const sql = `SELECT * FROM contact`;
      database.query(sql, (err, data) => {
        callback(err, data);
      });
    },
    get: (id, callback) => {
      const sql = `SELECT * FROM contact WHERE id=${id}`;
      database.query(sql, (err, data) => {
        callback(err, data);
      });      
    },
    query: (queryString, callback) => {
      const sql = `SELECT * FROM contact ${where(queryString)}`;
      database.query(sql, (err, data) => {
        callback(err, data);
      });       
    },
  },
  event : {
    getAll: (callback) => {
      const sql = `SELECT * FROM event`;
      database.query(sql, (err, data) => {
        callback(err, data);
      });
    },
    get: (id, callback) => {
      const sql = `SELECT * FROM event WHERE id=${id}`;
      database.query(sql, (err, data) => {
        callback(err, data);
      });      
    },
    query: (queryString, callback) => {
      const sql = `SELECT * FROM event ${where(queryString)}`;
      database.query(sql, (err, data) => {
        callback(err, data);
      });       
    },
  },
  job : {
    getAll: (callback) => {
      const sql = `SELECT * FROM job`;
      database.query(sql, (err, data) => {
        callback(err, data);
      });
    },
    get: (id, callback) => {
      const sql = `SELECT * FROM job WHERE id=${id}`;
      database.query(sql, (err, data) => {
        callback(err, data);
      });      
    },
    query: (queryString, callback) => {
      const sql = `SELECT * FROM job ${where(queryString)}`;
      database.query(sql, (err, data) => {
        callback(err, data);
      });       
    },
  },
  resource : {
    getAll: (callback) => {
      const sql = `SELECT * FROM resource`;
      database.query(sql, (err, data) => {
        callback(err, data);
      });
    },
    get: (id, callback) => {
      const sql = `SELECT * FROM resource WHERE id=${id}`;
      database.query(sql, (err, data) => {
        callback(err, data);
      });      
    },
    query: (queryString, callback) => {
      const sql = `SELECT * FROM resource ${where(queryString)}`;
      database.query(sql, (err, data) => {
        callback(err, data);
      });       
    },
  },
  user : {
    getAll: (callback) => {
      const sql = `SELECT * FROM user`;
      database.query(sql, (err, data) => {
        callback(err, data);
      });
    },
    get: (id, callback) => {
      const sql = `SELECT * FROM user WHERE id=${id}`;
      database.query(sql, (err, data) => {
        callback(err, data);
      });      
    },
    query: (queryString, callback) => {
      const sql = `SELECT * FROM user ${where(queryString)}`;
      database.query(sql, (err, data) => {
        callback(err, data);
      });       
    },
  },
}
export default model;