const db = require('../connection');

// Return name of category based on ID
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

// Return ID of category based on name
const getCategoryByName = (name) => {
  const queryString = `SELECT id
  FROM categories
  WHERE name LIKE $1`;
  const queryParams = [ `%${name}%` ];

  return db.query(queryString, queryParams)
  .then((data) => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};

module.exports = {
  getCategoryById,
  getCategoryByName
};
