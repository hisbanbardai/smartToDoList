const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then((data) => {
      return data.rows;
    });
};

const getUserById = (userId) => {
  const queryString = `SELECT *
  FROM users
  WHERE id = $1`;
  const queryParams = [userId];

  return db.query(queryString, queryParams)
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  getUsers,
  getUserById
};
