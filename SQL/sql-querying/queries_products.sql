-- INSERT INTO products (name,price,can_be_returned) VALUES ('Chair',44.00,False);
-- INSERT INTO products (name,price,can_be_returned) VALUES ('Stool',25.99,True);
-- INSERT INTO products (name,price,can_be_returned) VALUES ('Table',124.00,False);
-- SELECT * FROM products;
-- SELECT name FROM products;
-- SELECT name,price FROM products;
-- INSERT INTO products (name,price,can_be_returned) VALUES ('BiggerChair',1595.00,False);
-- SELECT name FROM products WHERE can_be_returned = 't';
-- SELECT name FROM products WHERE price < 44.00;
-- SELECT name FROM products WHERE price >= 22.50 AND price <= 99.99;
-- UPDATE products SET price = price - 20.00;
-- DELETE FROM products WHERE price < 25.00;
-- UPDATE products SET price = price + 20.00;
-- UPDATE products SET can_be_returned = 't';