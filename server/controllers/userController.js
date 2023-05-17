const User = require("../models/User");
const bcrypt = require('bcrypt');


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

exports.getUserByEmail = async(email) => {
    try{
        const user = await User.findOne({email:email})
        return user;
    }catch(error){
        throw error;
    }
}

// Mettre à jour un profil utilisateur spécifique
exports.updateUserProfile = async (userId, data, secure) => {
    try {
        // Mettre à jour un utilisateur par son ID en utilisant les données de la requêt
        const updateFields = {
            fullname: data.fullname,
            profile_picture: data.profile_picture
        };

        if (secure) {
            updateFields.email = data.email;
            updateFields.password = await bcrypt.hash(data.password, 10);
        }

        const updatedUserProfile = await User.findByIdAndUpdate(userId, updateFields);
        
        // Si aucun utilisateur n'est trouvé, renvoyer une erreur pour être capturée par l'appelant
        if (!updatedUserProfile) {
            throw new Error('User profile not found');
        }
    } catch (error) {
        // En cas d'erreur, renvoyer une erreur pour être capturée par l'appelant
        throw error;
    }
};

