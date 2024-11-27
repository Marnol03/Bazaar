CREATE TABLE IF NOT EXISTS public.products (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    prix INT,
    imageUrl VARCHAR(255),
    note DECIMAL(2, 1),
    reduction BOOLEAN DEFAULT FALSE
);

CREATE TABLE public.users (
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

INSERT INTO products (nom, prix, imageUrl, note, reduction) VALUES
    ('Jogging', 5425, 'https://raw.githubusercontent.com/Marnol03/Bazaar/refs/heads/main/frontend/src/images/jogging.jpeg', 2.4, TRUE),
    ('Jordan nike', 12954, 'https://raw.githubusercontent.com/Marnol03/Bazaar/refs/heads/main/frontend/src/images/jordan.jpeg', 4.8, TRUE),
    ('Galaxy s22', 145250, 'https://raw.githubusercontent.com/Marnol03/Bazaar/refs/heads/main/frontend/src/images/phone_1.jpeg', 4.0, FALSE),
    ('Hp computer', 97230, 'https://raw.githubusercontent.com/Marnol03/Bazaar/refs/heads/main/frontend/src/images/laptop_1.jpg', 5.0, FALSE),
    ('Nike', 12954, 'https://raw.githubusercontent.com/Marnol03/Bazaar/refs/heads/main/frontend/src/images/nike.jpeg', 4.4, TRUE),
    ('Rolex', 733839, 'https://raw.githubusercontent.com/Marnol03/Bazaar/refs/heads/main/frontend/src/images/rolex.png', 3.7, FALSE),
    ('T-shirt', 2542, 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSlxtBRlMV9nF19_ieQ5A-tMCEwPIOiQgU0Tl8E9fMNVm7bu-23h7-1AVQpr_gLwGFceUJEcwEb', 3.2, FALSE),
    ('Ecran', 3842, 'https://media.gettyimages.com/id/1370800508/de/foto/blank-pc-monitor-mockup-with-white-screen-isolated-on-white-background.jpg?s=612x612&w=gi&k=20&c=6s1KfwAFXvmlhM3pfRZFlMDDyD3H6_SwIgOgM9v7fJo=', 4.2, TRUE),
    ('Iphone 13 pro max blue', 502954, 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_108019222?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402', 4.8, TRUE),
    ('Macbook air M1', 459350, 'https://5.imimg.com/data5/SELLER/Default/2021/1/TX/FH/WC/7808107/12-inch-macbook-computer-laptops.jpg', 4.8, FALSE),
    ('nintendo switch', 105950, 'https://assets.nintendo.eu/image/upload/f_auto,c_limit,w_1920,q_auto:low/MNS/Content%20Pages%20Assets/Category-List%20Pages/Consoles/Nintendo%20Switch%20Hub/2000x1125_Consoles_Switch_Flagship_BeautyShot', 4.8, TRUE),
    ('Playstation 5', 320350, 'https://image.coolblue.de/422x390/products/1994458', 4.8, TRUE),
    ('Xbox series x', 275450, 'https://www.xboxdynasty.de/wp-content/uploads/2019/12/xbox-series-x-226-720x515.jpg.pagespeed.ce.uwzoIdxBka.jpg', 4.8, TRUE);
    

