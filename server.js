require("dotenv").config();

const express = require("express"); 
const app = express(); 

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Welcome");
});

app.use("/api", require("./routes/authRoute"));

// Starting server using listen function
app.listen(process.env.PORT, function (err) {
    if (err) {
        console.log("Error while starting server");
    } else {
        console.log("Server has been started at " + process.env.PORT);
    }
});
