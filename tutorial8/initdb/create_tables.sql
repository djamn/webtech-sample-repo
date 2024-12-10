DROP TABLE IF EXISTS Bike;

CREATE TABLE Bike
(
    bike_id             SERIAL PRIMARY KEY,
    bike_name           VARCHAR(100) NOT NULL,
    is_available        BOOLEAN      DEFAULT TRUE,
    size                INT          NOT NULL,
    price               FLOAT        NOT NULL,
);


INSERT INTO Bike (bike_name, is_available, size, price)
VALUES ('Mountain-Bike 300', TRUE, 20, 5.0),
       ('E-Bike', FALSE, 50, 5.0),
        ('Mountain-Bike 500', TRUE, 40, 10.0);