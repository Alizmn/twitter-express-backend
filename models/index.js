module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: `SELECT * FROM users`,
    };
    return db
      .query(query)
      .then((res) => res.rows)
      .catch((err) => err);
  };
  const getByUsername = (username) => {
    const query = {
      text: `SELECT * FROM users WHERE LOWER(username) = LOWER($1)`,
      values: [username],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const getTweetsByUsername = (username) => {
    const query = {
      text: `SELECT tweets.id, tweets.tweet, tweets.edited FROM tweets INNER JOIN users ON user_id = users.id WHERE LOWER(username) = LOWER($1) AND tweets.deleted IS FALSE`,
      values: [username],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addUser = (username, password) => {
    const query = {
      text: `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
      values: [username, password],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  return {
    getUsers,
    getByUsername,
    getTweetsByUsername,
    addUser,
  };
};
