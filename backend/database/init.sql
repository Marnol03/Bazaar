CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    prix INT,
    imageUrl VARCHAR(255),
    note DECIMAL(2, 1)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL UNIQUE,
    username VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    role VARCHAR(10) DEFAULT 'user' CHECK(role IN ('user', 'admin'))
);

-- Créer la fonction de trigger
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Créer le trigger
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

INSERT INTO products (nom, prix, imageUrl, note) VALUES
    ('Jogging', 5425, '../images/jogging.jpeg', 2.4),
    ('Jordan nike', 12954, '../images/jordan.jpeg', 4.8),
    ('Galaxy s22', 145250, '../images/phone_1.jpeg', 4.0),
    ('Hp computer', 97230, '../images/laptop_1.jpg', 5.0),
    ('Nike', 12954, '../images/nike.jpeg', 4.4),
    ('Rolex', 733839, '../images/rolex.png', 3.7);

