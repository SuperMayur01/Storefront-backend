CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name varchar,
    price int,
    category varchar
);

INSERT INTO products (name, price, category) VALUES 
('The Alchemist', 10,'Books'),
('Macbook', 900,'Electronics'),
('Digital Fortress', 13,'Books'),
('Ideapad', 750,'Electronics'),
('Fountain Pen', 2,'Supplies'),
('Probook', 560,'Electronics'),
('Nike', 200,'Shoes'),
('Air Jordan', 399,'Shoes');
