// Importer le module express pour créer des routes
const express = require("express");


// Importer le contrôleur userController pour gérer les requêtes de profil utilisateur
const userController = require("../controllers/userController");

// Créer un nouveau routeur Express
const router = express.Router();

// Créer une route pour créer un nouveau profil utilisateur
router.post('/create', async (req, res) => {
    try {
        // Appeler la fonction createUser du contrôleur pour créer un nouvel utilisateur
        const NewUser = await userController.createUser(req.body);
        // Renvoyer une réponse 201 avec les données de l'utilisateur nouvellement créé
        res.status(201).json(NewUser);
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse 500 avec un message d'erreur générique
        res.status(500).json({ message: error.message });
    }
});

// Créer une route pour lire un profil d'utilisateur spécifique
router.get('/:userId', async (req, res) => {
    try {
        // Appeler la fonction getUserProfile du contrôleur pour lire un utilisateur par ID
        const getUser = await userController.getUserProfile(req.params.userId);
        // Renvoyer une réponse 200 avec les données de l'utilisateur
        res.status(200).json(getUser);
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse 500 avec un message d'erreur générique
        res.status(500).json({ message: error.message });
    }
});

// Créer une route pour mettre à jour un profil d'utilisateur spécifique
router.put('/:userId/update', async (req, res) => {
    try {
        // Appeler la fonction updateUserProfile du contrôleur pour mettre à jour un utilisateur par ID
        const updatedUser = await userController.updateUserProfile(req.params.userId, req.body);
        // Renvoyer une réponse 200 avec les données mises à jour de l'utilisateur
        res.status(200).json(updatedUser);
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse 500 avec un message d'erreur générique
        res.status(500).json({ message: error.message });
    }
});

// Créer une route pour supprimer un profil d'utilisateur spécifique
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
})

// Exporter le routeur pour pouvoir l'utiliser dans d'autres fichiers de l'application
module.exports = router;

