const mongoose = require("mongoose");

// Remplacez cette chaîne de connexion par celle de votre cluster MongoDB Atlas
const mongoDBURL = "mongodb+srv://Gesta:BgCdKkTqz3cb2eTV@gesta.fzolt34.mongodb.net/Gesta?retryWrites=true&w=majority";

mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
    console.error("Error connecting to MongoDB:", err);
});
