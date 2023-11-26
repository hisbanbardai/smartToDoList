const db = require('../connection');

const getToDos = (user_id) => {
  const queryString = `SELECT *
  FROM to_dos
  WHERE user_id = $1`;
  const queryParams = [user_id];

  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getToDosByCategory = (category_id, user_id) => {
  const queryString = `SELECT *
  FROM to_dos
  JOIN categories ON categories.id = category_id
  WHERE category_id = $1
  AND user_id = $2;`;
  const queryParams = [category_id, user_id];

  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
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
    .catch((err) => {
      console.log(err.message);
    });
};

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
    queryParams.push(property[key]);
    queryString += `$${queryParams.length}`;

    // Add to all values except for final value
    if (i < keys.length - 1) {
      queryString += `, `;
    }
  }

  queryString += `)
  RETURNING *;
  `;

  return db.query(queryString, queryParams)
  .then((data) => {
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

const editToDo = (toDo) => {
  // Assumes toDo contains keys called "id" and "category_id"
  const queryParams = [];

  let queryString = `UPDATE to_dos
  SET `;

  queryParams.push(Number(toDo.category_id));
  queryString += `category_id = $${queryParams.length}`;

  queryParams.push((Number(toDo.id)));
  queryString += `WHERE id = $${queryParams.length}
  RETURNING *;
  `;

  return db.query(queryString, queryParams)
  .then((data) => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};

const deleteToDo = (toDo_id) => {
  const queryString = `DELETE FROM to_dos
  WHERE id = $1
  RETURNING *;`;
  const queryParams = [toDo_id];

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
  editToDo
 };
