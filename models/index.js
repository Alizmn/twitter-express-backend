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

  return {
    getUsers,
  };
};
