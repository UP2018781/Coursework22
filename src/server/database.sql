CREATE ROLE server WITH LOGIN SUPERUSER PASSWORD 'password';

CREATE TABLE bricks (
    ID SERIAL PRIMARY KEY,
    Colour VARCHAR(20),
    StockLevel SMALLINT NOT NULL,
    Price FLOAT(2) NOT NULL,
    Name VARCHAR(32),
    Description TEXT,
    Image TEXT
);

CREATE TABLE sets (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(32),
    Price FLOAT(2) NOT NULL,
    Description TEXT,
    StockLevel SMALLINT NOT NULL,
    Image TEXT
);

CREATE TABLE bricksInSets (
    brickID SMALLINT,
    brickAmount SMALLINT,
    setID SMALLINT
);

ALTER TABLE bricksInSets
ADD CONSTRAINT brickFK
FOREIGN KEY (brickID)
REFERENCES bricks(ID)
ON DELETE CASCADE;

ALTER TABLE bricksInSets
ADD CONSTRAINT setFK
FOREIGN KEY (setID)
REFERENCES sets(ID)
ON DELETE CASCADE;

INSERT INTO bricks (ID, Colour, StockLevel, Price, Name, Description) 
VALUES
(DEFAULT, 'blue', 10, 2.00, 'blue 2x2', 'standard full size blue 2x2'),
(DEFAULT, 'red', 10, 3.00, 'red 2x2', 'standard full size red 2x2'),
(DEFAULT, 'yellow', 10, 9.99, 'yellow 2x4', 'standard full size yellow 2x4'),
(DEFAULT, 'green', 10, 1.09, 'green 1x1 stud', 'a green 1x1 stud, rare for the colour!'),
(DEFAULT, 'blue', 10, 0.50, 'blue 2x4', 'standard full size blue 2x4'),
(DEFAULT, 'green', 10, 1.99, 'green 2x2', 'standard full size green 2x2'),
(DEFAULT, 'orange', 15, 3.45, 'orange 2x2', 'standard full size orange 2x2');

INSERT INTO bricks (id, colour, name, Description, stocklevel, price)
VALUES
(2780, 'red', 'Technic Pin', 'technical piece for joins', 582, 0.12),
(3069, 'blue', 'Tile 1x2', 'flat piece for decoration', 410, 1.52),
(3710, 'yellow', 'Plate 1x4', 'big piece for houses', 123, 1.12),
(3004, 'green', 'Brick 1x2', 'big brick piece', 520, 1.00),
(3020, 'black', 'Plate 2x4', 'large piece for joins', 142, 2.00),
(3022, 'red', 'Plate 2x2', 'piece for joins', 156, 1.15),
(3005, 'yellow', 'Tile 1x1', 'tile piece for house', 456, 0.58),
(15573, 'blue', 'Jumper 1x2', 'jumper piece for cars', 510, 0.99),
(2412, 'blue', 'Grille 1x2', 'grille piece for bbq', 134, 1.00), 
(11477, 'red', 'Curved', 'curved piece for bbq', 320, 4.00),
(2420, 'green', 'Corner', 'corner for round piece', 654, 0.87),
(15712, 'yellow', 'Top', 'top clip for smthng', 456, 2.12);

INSERT INTO sets (ID, name, price, Description, stocklevel)
VALUES
(DEFAULT, 'Bonsai Tree', 169.99,'A lovely hand crafted bonsai tree', 5),
(DEFAULT, 'Large Crocodile', 209.98,'A perfect toy for the whole family!',2),
(DEFAULT, 'car', 1.23, 'yellow car with 4 wheels', 158),
(DEFAULT, 'tree', 6.00, 'large green tree', 454),
(DEFAULT, 'table', 19.00, 'white table for lego people', 41),
(DEFAULT, 'house', 84.12, 'big red house', 45),
(DEFAULT, 'star wars thing', 450, 'big start wars thing idk', 120);

INSERT INTO bricksInSets (brickID, brickAmount, setID)
VALUES
(2780, 42, 1),
(3020, 35, 1),
(2412, 36, 2),
(3005, 25, 2),
(3069, 13, 2),
(15712, 14, 3),
(20, 10, 3),
(14, 10, 3),
(3005, 27, 4),
(3069, 14, 4),
(2780, 43, 4),
(12, 30, 5),
(3022, 14, 5),
(10, 12, 6),
(8, 9, 6),
(11477, 8, 7),
(3710, 47, 7);
-- (11, 48, 8),
-- (15, 47, 8),
-- (17, 45, 9),
-- (18, 17, 9);