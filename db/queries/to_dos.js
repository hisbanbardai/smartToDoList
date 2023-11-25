const db = require('../connection');

const getToDos = () => {
  return db.query('SELECT * FROM to_dos;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getToDos };
