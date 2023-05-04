const express = require("express");
const userController = require("../controllers/userController");
const getId = require('../utils/getIdFromToken');
const router = express.Router();
const sendVerification = require('../utils/sendSecurityVerificationEmail')
const resetTokenManager = require('../utils/SecurityResetTokenManager');

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
router.put('/profile/update', async (req, res) => {
    const id = getId(req);
    const secure = false;
    try {
        await userController.updateUserProfile(id, req.body, secure);
        // Renvoyer une réponse 200 avec les données mises à jour de l'utilisateur
        res.status(200).json({message:"user is updated"});
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse 500 avec un message d'erreur générique
        res.status(500).json({ message: "le serveur a rencontré un probléme" });
    }
});

router.post('/profile/update/resetPassword', async(req, res)=>{

    try{
         const user = await userController.getUserByEmail(req.body.email);
         
         if(user){
            const  resetToken = require('../utils/resetTokenGenerator');
            await resetTokenManager.saveResetToken(user._id, resetToken, "password"); 
            sendVerification(user.email, user.fullname, "password", resetToken);
         }
         res.status(200).json({message:"email has been sent"})
    }catch(error){
        res.status(500).json({message:"le serveur a rencontré un probléme"});
    }
})


module.exports = router;

