const db = require('../connection');

// const getToDos = () => {
//   return db.query('SELECT * FROM to_dos;')
//     .then(data => {
//       return data.rows;
//     });
// };

const getToDosByCategory = (category) => {
  const queryString = `SELECT *
  FROM to_dos
  WHERE category_id = $1;`;
  const queryParams = [category];

  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getToDosByCategory };
