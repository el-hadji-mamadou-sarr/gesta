// importer le module mongoose pour interagir avec la base de données MongoDB
const mongoose = require("mongoose");

// Créer un nouveau schéma pour représenter les données de l'utilisateur
const UserSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_picture:{type: String, required: false},
    banner_color:{type: String, required: true},
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'projects' }]
})

const User = mongoose.model("users", UserSchema);

// Exporter le modèle pour pouvoir l'utiliser dans d'autres fichiers
module.exports = User;
