// Importer le modèle User pour pouvoir l'utiliser dans le contrôleur
const User = require("../models/User");

// Créer un nouveau profil utilisateur
exports.createUser = async (data) => {
    try {
        // Créer un nouvel objet User à partir des données de la requête
        const newUserProfile = new User(data);
        // Enregistrer le nouvel utilisateur dans la base de données
        await newUserProfile.save();
        // Renvoyer les données de l'utilisateur nouvellement créé
        return newUserProfile;
    } catch (error) {
        // En cas d'erreur, renvoyer une erreur pour être capturée par l'appelant
        throw error;
    }
};

// Lire un profil utilisateur spécifique
exports.getUserProfile = async (userId) => {
    try {
        // Rechercher un utilisateur par son ID
        const userProfile = await User.findOne({ _id: userId });
        // Si aucun utilisateur n'est trouvé, renvoyer une erreur pour être capturée par l'appelant
        if (!userProfile) {
            throw new Error('User profile not found');
        }
        // Si l'utilisateur est trouvé, renvoyer les données de l'utilisateur
        return userProfile;
    } catch (error) {
        // En cas d'erreur, renvoyer une erreur pour être capturée par l'appelant
        throw error;
    }
};

// Mettre à jour un profil utilisateur spécifique
exports.updateUserProfile = async (userId, data) => {
    try {
        // Mettre à jour un utilisateur par son ID en utilisant les données de la requête
        const updatedUserProfile = await User.findByIdAndUpdate(
            userId, // L'ID de l'utilisateur à mettre à jour
            data, // Les nouvelles données de l'utilisateur
            { new: true } // Options pour retourner la nouvelle version de l'utilisateur
        );
        // Si aucun utilisateur n'est trouvé, renvoyer une erreur pour être capturée par l'appelant
        if (!updatedUserProfile) {
            throw new Error('User profile not found');
        }
        // Si l'utilisateur est mis à jour, renvoyer les données mises à jour de l'utilisateur
        return updatedUserProfile;
    } catch (error) {
        // En cas d'erreur, renvoyer une erreur pour être capturée par l'appelant
        throw error;
    }
};

// Supprimer un profil utilisateur spécifique
exports.deleteUserProfile = async (userId) => {
    try {
        // Supprimer un utilisateur par son ID
        const deletedUserProfile = await User.findByIdAndDelete(userId);
        // Si aucun utilisateur n'est trouvé, renvoyer une erreur pour être capturée par l'appelant
        if (!deletedUserProfile) {
            throw new Error('User profile not found');
        }
    } catch (error) {
        // En cas d'erreur, renvoyer une erreur pour être capturée par l'appelant
        throw error;
    }
};
