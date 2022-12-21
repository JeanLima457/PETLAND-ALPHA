//modules 

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expres = require("express");
const cors = require("cors");

//Mongo DB Atlas
const connectDatabase = require("./database/db.js")

//routes
const authRouter = require("./routes/authRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const partyRouter = require("./routes/partyRoutes.js");

//middlewares1

//config
const dbName = "partytimeweb";
const port = 3000;

//Chamando o Mongo DB Atlas
connectDatabase();

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.static("public"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/party", partyRouter);

//atrelar as rotas no express

app.get("/", (req, res) => {
    res.json({ message: "Rota teste!" })
});

app.listen(port, () => {
    console.log(`O backend está rodando na porta ${port}`)
});