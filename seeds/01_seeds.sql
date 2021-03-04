INSERT INTO users (name, email, password) 
VALUES ('Beth Harmon', 'beth.harmon@queens.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) 
VALUES ('Louis Armstrong', 'lou222@cycle.uk', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) 
VALUES ('Rex Raptor', 't-rex_rawr@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) 
VALUES ('Eva Stanley', 'evastanley@youwho.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) 
VALUES ('Mark Wong', 'wong999@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) 
VALUES ('Dave Grohl', 'the_real_foo@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (
  id, 
  owner_id, 
  title, 
  description, 
  thumbnail_photo_url, 
  cover_photo_url, 
  cost_per_night, 
  parking_spaces, 
  number_of_bathrooms, 
  number_of_bedrooms,
  country, 
  street, 
  city, 
  province, 
  post_code
) VALUES 

(
  1,
  1, 
  'Rooks Manor', 
  'description', 
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzdGxlfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80', 
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzdGxlfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80',
  1000,
  0,
  5,
  10,
  'Ireland',
  'Harmon Way',
  'Dublin',
  'Glattinsburry',
  '1K16C5'
);

INSERT INTO properties (
  id, 
  owner_id, 
  title, 
  description, 
  thumbnail_photo_url, 
  cover_photo_url, 
  cost_per_night, 
  parking_spaces, 
  number_of_bathrooms, 
  number_of_bedrooms,
  country, 
  street, 
  city, 
  province, 
  post_code
) VALUES

(
  2,
  2, 
  'One Bedroom + Den', 
  'description', 
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBngVfAFZw_qNoasnKQTMFyB9NsnNNQhLyfw&usqp=CAU', 
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBngVfAFZw_qNoasnKQTMFyB9NsnNNQhLyfw&usqp=CAU',
  250,
  1,
  1,
  1,
  'Great Britain',
  'King Street W',
  'London',
  'Glattinsborough',
  '1A19C5'
);

INSERT INTO properties ( 
  id,
  owner_id, 
  title, 
  description, 
  thumbnail_photo_url, 
  cover_photo_url, 
  cost_per_night, 
  parking_spaces, 
  number_of_bathrooms, 
  number_of_bedrooms,
  country, 
  street, 
  city, 
  province, 
  post_code
) VALUES

(
  3,
  3, 
  'Full House', 
  'description', 
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBngVfAFZw_qNoasnKQTMFyB9NsnNNQhLyfw&usqp=CAU', 
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBngVfAFZw_qNoasnKQTMFyB9NsnNNQhLyfw&usqp=CAU',
  150,
  4,
  2,
  4,
  'Canada',
  'Wooten Way',
  'Toronto',
  'Ontario',
  '6A38G2'
);

INSERT INTO reservations ( start_date, end_date, property_id, guest_id) 
VALUES ('2019-01-25', '2019-02-04', 1, 6);
INSERT INTO reservations ( start_date, end_date, property_id, guest_id) 
VALUES ('2018-09-10', '2018-09-10', 2, 1);
INSERT INTO reservations ( start_date, end_date, property_id, guest_id) 
VALUES ('2018-09-10', '2018-09-10', 3, 4);
INSERT INTO reservations ( start_date, end_date, property_id, guest_id) 
VALUES ('2020-05-16', '2020-05-19', 3, 5);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
VALUES (6, 1, 1, 5, 'messages');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
VALUES (1, 2, 2, 4, 'messages');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
VALUES (4, 3, 3, 3, 'messages');