const db = require('../connection');

// Get all To Dos for a specific user
const getToDos = (userId) => {
  const queryString = `SELECT *
  FROM to_dos
  WHERE user_id = $1;`;
  const queryParams = [userId];

  return db.query(queryString, queryParams)
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Get all To Dos for a specific user with a specific category
const getToDosByCategory = (categoryId, userId) => {
  const queryString = `SELECT *
  FROM to_dos
  JOIN categories ON categories.id = category_id
  WHERE category_id = $1
  AND user_id = $2;`;
  const queryParams = [categoryId, userId];

  return db.query(queryString, queryParams)
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Fetch To Do using single ID
const getToDoById = (toDoId) => {
  const queryString = `SELECT *
  FROM to_dos
  WHERE id = $1;`;
  const queryParams = [toDoId];

  return db.query(queryString, queryParams)
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Add new To Do with required (NOT NULL) values only
const addToDo = (toDo) => {
  const queryParams = [];
  const keys = Object.keys(toDo);

  let queryString = `INSERT INTO to_dos (
    name,
    category_id,
    user_id,
    created_at
    )
    VALUES (`;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    queryParams.push(toDo[key]);
    queryString += `$${queryParams.length}`;

    // Add to all values except for final value
    if (i < keys.length - 1) {
      queryString += `, `;
    }
  }

  queryString += `)
  RETURNING *;`;

  return db.query(queryString, queryParams)
    .then((data) => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Update category of a To Do using ID
const editToDo = (toDo) => {
  // Assumes toDo contains keys called "id" and "category_id"
  const queryParams = [];

  let queryString = `UPDATE to_dos
  SET `;

  queryParams.push(Number(toDo.category_id));
  queryString += `category_id = $${queryParams.length}`;

  queryParams.push((Number(toDo.id)));
  queryString += `WHERE id = $${queryParams.length}
  RETURNING *;`;

  return db.query(queryString, queryParams)
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Delete a To Do using single ID
const deleteToDo = (toDoId) => {
  const queryString = `DELETE FROM to_dos
  WHERE id = $1
  RETURNING *;`;
  const queryParams = [toDoId];

  return db.query(queryString, queryParams)
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  getToDos,
  getToDosByCategory,
  getToDoById,
  addToDo,
  editToDo,
  deleteToDo
};
