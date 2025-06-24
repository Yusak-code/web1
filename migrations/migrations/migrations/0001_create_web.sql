CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER
);

INSERT INTO products(name, price) VALUES ('produk 1', 5000), ('produk 2', 6000);