psql -h localhost -p 5432 -U blogs_admin blogs

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('John Functionman', 'https://functions.com', 'Higher order functions');
INSERT INTO blogs (author, url, title) VALUES ('John Functionman', 'https://functions.com', 'Currying and partial function application');
