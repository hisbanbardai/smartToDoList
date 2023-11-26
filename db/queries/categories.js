const db = require('../connection');

const getCategoryById = (id) => {
  const queryString = `SELECT name
  FROM categories
  WHERE id = $1`;
  const queryParams = [id];

  return db.query(queryString, queryParams)
  .then((data) => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};
