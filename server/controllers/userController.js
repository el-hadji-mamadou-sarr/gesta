// Importer le modèle User pour pouvoir l'utiliser dans le contrôleur
const User = require("../models/User");



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
        );
        // Si aucun utilisateur n'est trouvé, renvoyer une erreur pour être capturée par l'appelant
        if (!updatedUserProfile) {
            throw new Error('User profile not found');
        }
    } catch (error) {
        // En cas d'erreur, renvoyer une erreur pour être capturée par l'appelant
        throw error;
    }
};

/* // Supprimer un profil utilisateur spécifique
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
}; */
