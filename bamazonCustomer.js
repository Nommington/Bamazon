var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
require("dotenv").config();

var table = new Table({
    chars: { 'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗', 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝', 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼', 'right': '║', 'right-mid': '╢', 'middle': '│' }
});


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
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
        arr = [id, name, dept, price, stock];
        table.push(arr);
    }
    console.log(table.toString());
}

function marketplace() {
    
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log("WELCOME TO BAMAZON!");
        dispTable(results);
        
        

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
