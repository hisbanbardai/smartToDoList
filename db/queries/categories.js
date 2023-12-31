const db = require('../connection');

// Return ID of category based on name
const getCategoryByName = (name) => {
  const queryString = `SELECT id
  FROM categories
  WHERE name LIKE $1`;
  const queryParams = [`%${name}%`];

  return db.query(queryString, queryParams)
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getCategories = () => {
  return db.query("SELECT * FROM categories;").then((data) => {
    return data.rows;
  });
};

module.exports = { getCategoryByName, getCategories };
