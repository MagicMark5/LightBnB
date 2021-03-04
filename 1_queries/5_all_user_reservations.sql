SELECT properties.*, reservations.*, avg(rating) as average_rating
FROM properties
JOIN property_reviews ON property_reviews.property_id = properties.id
JOIN reservations ON reservations.property_id = properties.id
JOIN users ON reservations.guest_id = users.id
WHERE users.id = 1
AND now()::date > end_date
GROUP BY properties.id, reservations.id
ORDER BY start_date
LIMIT 10;
