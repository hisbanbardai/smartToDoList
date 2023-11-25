const db = require('../connection');

// const getToDos = () => {
//   return db.query('SELECT * FROM to_dos;')
//     .then(data => {
//       return data.rows;
//     });
// };

const getToDosByCategory = (category) => {
  return db.query(`
  SELECT *
  FROM to_dos
  WHERE category = ${category};`)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getToDosByCategory };
