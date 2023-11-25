const db = require('../connection');

// const getToDos = () => {
//   return db.query('SELECT * FROM to_dos;')
//     .then(data => {
//       return data.rows;
//     });
// };

const getToDosByCategory = (category_id) => {
  const queryString = `SELECT *
  FROM to_dos
  JOIN categories ON categories.id = category_id
  WHERE category_id = $1;`;
  const queryParams = [category_id];

  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch((err => {
      console.log(err.message);
    }));
};

const getToDoById = (toDo_id) => {
  const queryString = `SELECT *
  FROM to_dos
  WHERE id = $1;`;
  const queryParams = [toDo_id];

  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch((err => {
      console.log(err.message);
    }));
};

module.exports = { getToDosByCategory };
