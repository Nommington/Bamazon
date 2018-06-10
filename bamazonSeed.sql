DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price FLOAT(10,2),
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
    );
    
    INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("TARDIS", "transportation", 9999999.99, 1),
		("tube socks", "clothing", 2.50, 20),
        ("Bodhicitta", "metaphysical concepts", 0, 999999999),
        ("flux capacitor", "vehicle components", 3, 1955.50),
        ("Space Jam on VHS", "media", 0.99, 20),
        ("green herb", "health items", 5, 5),
        ("DVD of Cool Runnings", "media", 10, 15),
        ("Abba-Zaba", "snack foods", 1, 30),
        ("Jelly Babies", "snack foods", 2, 26),
        ("Snow Falling by Jane Gloriana Villanueva", "literature", 25.50, 30),
        ("Official Flula Borg fanny pack", "accessories", 24.95, 4),
        ("head of Jebediah Springfield statue", "memorabilia", 1245.95, 1),
        ("ALF POGs", "collectibles", 1.99, 40);
