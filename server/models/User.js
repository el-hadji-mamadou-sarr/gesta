// importer le module mongoose pour interagir avec la base de données MongoDB
const mongoose = require("mongoose");

// Créer un nouveau schéma pour représenter les données de l'utilisateur
const UserSchema = new mongoose.Schema({
    // champ "username" de type chaîne de caractères, requis et unique
    fullname: { type: String, required: true},

    // champ "email" de type chaîne de caractères, requis et unique
    email: { type: String, required: true, unique: true },

    // champ "password" de type chaîne de caractères, requis et unique
    password: { type: String, required: true }

    //ajout d'autres champs si besoin
})

// Créer un modèle d'utilisateur basé sur le schéma défini ci-dessus
const User = mongoose.model("users", UserSchema);

// Exporter le modèle pour pouvoir l'utiliser dans d'autres fichiers
module.exports = User;
