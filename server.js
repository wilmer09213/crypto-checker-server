const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config({path: "./config/config.env"});


const cryptos = require("./routes/cryptos");

app.use("/cryptos", cryptos);


// if(process.env.NODE_ENV === production) {
//     app.use(express.static("../client/build"))

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
//     });
// }

app.use(express.static("public"))


const PORT  = process.env.PORT || 5000;

app.listen(process.env.PORT, console.log(`connected to port: ${process.env.PORT}`));
