-- SELECT * FROM owners FULL JOIN vehicles ON owner_id = owners.id
-- SELECT first_name,last_name,Count(owner_id) FROM owners  JOIN vehicles ON owner_id = owners.id WHERE first_name <> 'Maya' GROUP BY first_name,last_name ORDER BY first_name;
-- SELECT first_name,last_name,ROUND(AVG(price)) as average_price,Count(owner_id) FROM owners FULL JOIN vehicles ON owner_id = owners.id WHERE owner_id >=1 GROUP BY first_name,last_name HAVING COUNT(owner_id) > 1 AND ROUND(AVG(price)) > 10000 ORDER BY first_name desc;