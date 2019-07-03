// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var tables = [{
    name: "Betty White",
    email: "therealbettywhite@gmail.com",
    phoneNumber: "000-000-000",
    userId: "1"
}];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/table", function(req, res) {
  res.sendFile(path.join(__dirname, "table.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});


// Displays all tables
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Displays a single reservation, or returns false
app.get("/api/tables/:reservation", function(req, res) {
  var chosen = req.params.reservation;

  console.log(chosen);

  for (var i = 0; i < tables.length; i++) {
    if (chosen === tables[i].name) {
      return res.json(tables[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newRes = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newRes.name = newRes.name.replace(/\s+/g, "").toLowerCase();

  console.log(newRes);

  tables.push(newRes);

  res.json(newRes);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
