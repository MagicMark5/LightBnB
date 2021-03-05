const db = require('./db/pool');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  return db.queryOneRow(`SELECT * FROM users WHERE email = $1`, [email]);

}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  
  return db.queryOneRow(`SELECT * FROM users WHERE id = $1`, [id]);

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

  return db.queryOneRow(insert, values);

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

  return db.queryManyRows(queryString, [guest_id, limit]);

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
  console.log(options);
  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating 
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE 1 = 1
  `;
  
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString = `
    SELECT * FROM properties
    WHERE owner_id = $${queryParams.length}`;
  }

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${queryParams.length}`;
  }

  if (options.minimum_price_per_night || options.maximum_price_per_night) {
    let min = options.minimum_price_per_night;
    let max = options.maximum_price_per_night;
    if (min) {
      queryParams.push(`${min*100}`);
      queryString += `
      AND cost_per_night >= $${queryParams.length}`;
    }
    if (max) {
      queryParams.push(`${max*100}`);
      queryString += `
      AND cost_per_night <= $${queryParams.length}`;
    }
  }

  queryString += `
  GROUP BY properties.id`;

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `
    HAVING avg(rating) >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};`;

  return db.queryManyRows(queryString, queryParams);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  
  const values = [
    property.title, 
    property.description, 
    property.number_of_bedrooms,
    property.number_of_bathrooms, 
    property.parking_spaces, 
    property.cost_per_night*100, 
    property.thumbnail_photo_url, 
    property.cover_photo_url, 
    property.street, 
    property.country, 
    property.city, 
    property.province, 
    property.post_code,
    property.owner_id
  ];

  const insert = `
    INSERT INTO properties ( 
      title, 
      description, 
      number_of_bedrooms,
      number_of_bathrooms, 
      parking_spaces, 
      cost_per_night, 
      thumbnail_photo_url, 
      cover_photo_url, 
      street, 
      country, 
      city, 
      province, 
      post_code,
      owner_id
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
    RETURNING *;`;

  return db.queryOneRow(insert, values);

}
exports.addProperty = addProperty;
