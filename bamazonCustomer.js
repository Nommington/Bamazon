var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
require("dotenv").config();
idArr = [];

var table = new Table({
    chars: { 'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗', 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝', 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼', 'right': '║', 'right-mid': '╢', 'middle': '│' }
});

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.password,
    password: process.env.password,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id: " + connection.threadId);
    marketplace();
});

function dispTable(res) {
    var headerArray = ["ITEM ID", "ITEM NAME", "DEPARTMENT", "PRICE", "# IN STOCK"];
    table.push(headerArray);
    for (i = 0; i < res.length; i++) {
        var id = res[i].item_id;
        var name = res[i].product_name;
        var dept = res[i].department_name;
        var price = res[i].price;
        var stock = res[i].stock_quantity;
        arr = [id, name, dept, "$" + price, stock];
        table.push(arr);
    }
    console.log(table.toString());
}

function prompt(res) {

}

function marketplace() {

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        dispTable(results);
        
        console.log("WELCOME TO BAMAZON!");
        inquirer.prompt([
            {
                type: "input",
                name: "choice",
                message: "Please enter the ITEM ID of the item you'd like to purchase.",
                validate: function (input) {
                    if (parseInt(input) <= 0 || parseInt(input) > results.length) {
                        console.log("\nPlease make sure to enter a VALID ITEM ID.");
                        return false;
                    }
                    else return true;
                }
            },
            {
                type: "input",
                name: "quantity",
                message: "How many of this item would you like?",
                validate: function (input) {
                    if (parseInt(input) > 0) {
                        return true;
                    }
                    else {
                        console.log("\nQuantity must be greater than zero.");
                        return false;
                    }
                }
            }
        ]).then(function (answer) {
            var item = results[parseInt(answer.choice) - 1];            
            var quantity = parseInt(answer.quantity);
            if (quantity > item.stock_quantity) {
                console.log("I'm sorry. We only have " + item.stock_quantity + "of those in stock.");
                //prompt
            }
            else {
                console.log("ORDER CONFIRMATION");
                console.log("--------------------------------------------");
                console.log("ITEM: " + item.product_name);
                console.log("PRICE: $" + item.price);
                console.log("QUANTITY: " + quantity);
                console.log("TOTAL: $" + (item.price * quantity).toFixed(2));
            }
        });


        //inquirer.prompt([
        // {
        //   type: "input",
        //   name: "choice",
        //  message: "Please enter the ITEM ID of the item you'd like to purchase."
        //  },
        //  {
        //  type: "input"
        // }
        // ])
        // if (parseInt(answer.choice) > 0 && (parseInt(answer.choice) <= results.length) {

        // }
    });
}
