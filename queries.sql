select employeeId, (firstName || ' ' || lastName) as Name, birthdate
from employees;

select employeeId, (firstName || ' ' || lastName) as Name, birthdate
from employees
where birthDate
? '1965-01-01';
-- use single quotes for dates and strings

select *
from products
where price >= 100 and price < 200;


select *
from products
order by price desc 
limit 5;

-- ordering by multiple columns
select country
, city, address, customerName from customers
order by country, city, customerName

-- adding data
insert into categories
    (categoryName, description)
values
    ('Lambda Swag', 'Awesome Lambda Memorabilia');

--
select *
from categories
where categoryName like 'lambda%';

-- updating data
update categories
	set categoryName = 'LS Swag', description = 'Lambda Swag'
where categoryId = 9;

--removing data
delete from categories
where categoryId = 9;