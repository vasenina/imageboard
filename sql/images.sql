DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS images;


CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    url VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    country VARCHAR NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    comment_text VARCHAR NOT NULL, 
    username VARCHAR NOT NULL,
    image_id INTEGER NOT NULL REFERENCES images(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO images (url, username, title, country, description) VALUES (
    'https://s3.amazonaws.com/spicedling/dSVWkDKQkdnwD6biEbEjxUgiaWTlQEwo.jpeg',
    'funkychicken',
    'Kamchatka',
    'Russia',
    'This photo brings back so many great memories.'
);

INSERT INTO images (url, username, title, country, description) VALUES (
    'https://s3.amazonaws.com/spicedling/q6npWIA2BIH7zulzIbWySr_YrJO61jn0.jpeg',
    'discoduck',
    'Bastei Bridge',
    'Germany',
    'We can''t go on together with suspicious minds.'
);

INSERT INTO images (url, username, title,country, description) VALUES (
    'https://s3.amazonaws.com/spicedling/8E4WzPj5h86r_vXQ714QJL51N2-m-H2s.jpeg',
    'discoduck',
    'Baikal',
    'Russia',
    'That is the question.'
);
