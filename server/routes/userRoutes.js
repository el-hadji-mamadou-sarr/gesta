// Importer le module express pour créer des routes
const express = require("express");

// Importer le contrôleur userController pour gérer les requêtes de profil utilisateur
const userController = require("../controllers/userController");

const getId = require('../utils/getIdFromToken');

// Créer un nouveau routeur Express
const router = express.Router();

router.get('/profile', async(req, res)=>{

    const id = getId(req);
    try{
        const user = await userController.getUserProfile(id);
        res.status(200).json({
            fullname:user.fullname,
            email:user.email,
            banner_color:user.banner_color,
            profile_picture:user.profile_picture
        });

    }catch(error){
        res.status(500).json({message:"le serveur a rencontré un probléme"});
    }
});



// Créer une route pour lire un profil d'utilisateur spécifique
router.get('/:userId', async (req, res) => {
    try {
        // Appeler la fonction getUserProfile du contrôleur pour lire un utilisateur par ID
        const user = await userController.getUserProfile(req.params.userId);
        // Renvoyer une réponse 200 avec les données de l'utilisateur
        res.status(200).json(user);
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse 500 avec un message d'erreur générique
        res.status(500).json({ message: "le serveur a rencontré un probléme" });
    }
});

// Créer une route pour mettre à jour un profil d'utilisateur
router.put('/update', async (req, res) => {
    const id = getId(req);
    try {
        // Appeler la fonction updateUserProfile du contrôleur pour mettre à jour un utilisateur par ID
        await userController.updateUserProfile(id, req.body);
        // Renvoyer une réponse 200 avec les données mises à jour de l'utilisateur
        res.status(200).json({message:"user is updated"});
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse 500 avec un message d'erreur générique
        res.status(500).json({ message: "le serveur a rencontré un probléme" });
    }
});


/* // Créer une route pour supprimer un profil d'utilisateur spécifique
router.delete('/:userId/delete', async (req, res) => {
    try {
        // Appeler la fonction deleteUserProfile du contrôleur pour supprimer un utilisateur par ID
        await userController.deleteUserProfile(req.params.userId);
        // Renvoyer une réponse 200 avec un message de réussite
        res.status(200).json({ message: 'Un message confirmant la suppression de l utilisateur' });
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse 500 avec un message d'erreur générique
        res.status(500).json({ message: error.message })
    }
}) */

// Exporter le routeur pour pouvoir l'utiliser dans d'autres fichiers de l'application
module.exports = router;

