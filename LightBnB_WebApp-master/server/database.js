const { Pool } = require('pg');
const properties = require('./json/properties.json');
const users = require('./json/users.json');
const pool = new Pool({
  user: 'vagrant',
  host: 'localhost',
  database: 'lightbnb',
  password: '123', 
  port: 5432
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  
  return pool.query(`SELECT * FROM users WHERE email = $1`, [email])
    .then(res => res.rows[0])
    .catch(err => {
      console.log(err);
      return null;
    });
  // let user;
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }
  // return Promise.resolve(user);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  
  return pool.query(`SELECT * FROM users WHERE id = $1`, [id])
    .then(res => res.rows[0])
    .catch(err => {
      console.log(err);
      return null;
    });

  
  // return Promise.resolve(users[id]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const insert = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3) 
    RETURNING *`;
  const values = [user.name, user.email, user.password];

  return pool.query(insert, values)
    .then(res => res.rows[0])
    .catch(err => {
      console.log(err);
      return null;
    });

  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
    SELECT properties.*, reservations.*, avg(rating) as average_rating
    FROM properties
    JOIN property_reviews ON property_reviews.property_id = properties.id
    JOIN reservations ON reservations.property_id = properties.id
    JOIN users ON reservations.guest_id = users.id
    WHERE users.id = $1
    AND now()::date > end_date
    GROUP BY properties.id, reservations.id
    ORDER BY start_date
    LIMIT $2`;
  return pool.query(queryString, [guest_id, limit])
    .then(res => res.rows)
    .catch(err => {
      console.log(err);
      return null;
    });
  
  // return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const limitedProperties = {};
  pool.query(`
  SELECT * FROM properties
  LIMIT $1
  `, [limit])
  .then(res => res.rows);


  for (let i = 1; i <= limit; i++) {
    limitedProperties[i] = properties[i];
  }
  return Promise.resolve(limitedProperties);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
