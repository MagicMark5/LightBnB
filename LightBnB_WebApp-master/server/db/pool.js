const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  host: 'localhost',
  database: 'lightbnb',
  password: '123', 
  port: 5432
});

module.exports = {
  queryOneRow: (text, values) => {
    return pool.query(text, values)
      .then(res => res.rows[0])
      .catch(err => {
        console.log(err);
        return null;
      });
  },
  queryManyRows: (text, values) => {
    return pool.query(text, values)
      .then(res => res.rows)
      .catch(err => {
        console.log(err);
        return null;
      });
  }
}