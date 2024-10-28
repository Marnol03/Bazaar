CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    prix INT,
    imageUrl VARCHAR(255),
    note DECIMAL(2, 1)
);

INSERT INTO products (nom, prix, imageUrl, note) VALUES
    ('Jogging', 5425, '/images/jogging.jpeg', 2.4),
    ('Jordan nike', 12954, '/images/jordan.jpeg', 4.8),
    ('Galaxy s22', 145250, '/images/phone_1.jpeg', 4.0),
    ('Hp computer', 97230, '/images/laptop_1.jpg', 5.0),
    ('Nike', 12954, '/images/nike.jpeg', 4.4),
    ('Rolex', 733839, '/images/rolex.png', 3.7);
