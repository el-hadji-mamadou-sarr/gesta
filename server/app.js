// Importez les dépendances nécessaires
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");

//import le userProfile
const userRoutes = require('./routes/userRoutes')




// Créez une nouvelle application Express
const app = express();


// Utilise Helmet pour la sécurité HTTP de base
app.use(helmet());
// Utilise CORS pour contrôler l'accès entre les domaines
app.use(cors());


//url de connectioin pour MongoDB
const mongoDBURL = "mongodb+srv://Gesta:BgCdKkTqz3cb2eTV@gesta.fzolt34.mongodb.net/Gesta?retryWrites=true&w=majority";
// Connectez-vous à MongoDB
mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Un gestionnaire d'événements pour la connexion réussie à MongoDB
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

// Un gestionnaire d'événements pour les erreurs de connexion à MongoDB
mongoose.connection.on("error", (err) => {
    console.error("Error connecting to MongoDB:", err);
});

// Utilisez le middleware pour analyser les requêtes JSON
app.use(express.json());
// Utilisez le middleware pour analyser les données de formulaire
app.use(express.urlencoded({ extended: true }));

// Exemple d'une route GET de base pour la racine du serveur
app.get("/", (req, res) => {
    // Envoie "Hello World!" en réponse à la requête
    res.send("Hello World!");
});

// Définissez le port d'écoute du serveur
const PORT = process.env.PORT || 5000;


// Utilisez l'app avec Express
app.use('/api/users', userRoutes);


// Démarrez le serveur et écoutez les requêtes sur le port spécifié
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});






