const mongoose = require("mongoose")

const connectDatabase = () => {
    console.log("Concectando...")

    mongoose.connect("mongodb+srv://admin:admin@login.asv8m7r.mongodb.net/?retryWrites=true&w=majority",
    {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Mongo DB Atlas ON")).catch((error) => console.log (error));
};

module.exports = connectDatabase