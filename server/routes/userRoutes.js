const express = require("express");
const userController = require("../controllers/userController");
const getId = require('../utils/getIdFromToken');
const router = express.Router();
const sendVerification = require('../utils/sendSecurityVerificationEmail')
const resetTokenManager = require('../utils/SecurityResetTokenManager');


/**
 * @api {get} /api/users/profile get user
 * @apiName getUserProfile
 * @apiGroup User
 *
 * @apiSuccess {String} fullname fullname of the user.
 * @apiSuccess {String} email email of the user.
 * @apiSuccess {String} banner_color banner_color in hexadecimal of the user profile.
 * @apiSuccess {String} profile_picture profile picture of the user in base64.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 user found
 *     {
 *       "fullname": el hadji mamadou,
 *       "email": "elhadji.sarr@outlook.com",
 *       "banner_color": "#FFA500",
 *        "profile_picture" : "image in base64"
 *     }
 *
 * @apiError InternalServer.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal server error
 *     {
 *       "message": "le serveur a rencontré un probléme"
 *     }
 */
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


/**
 * @api {put} /api/users/profile/update update user public data
 * @apiName updateProfile
 * @apiGroup User
 *
 * @apiParam {String} fullname
 * @apiParam {String} profile_picture
 *
 * @apiSuccess NoContent
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 
 *     {
 *      "message":"user is updated"
 *     }
 *
 * @apiError InternalServer.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal server error
 *     {
 *       "message": "le serveur a rencontré un probléme"
 *     }
 */
router.put('/profile/update', async (req, res) => {
    const id = getId(req);
    const secure = false;
    try {
        await userController.updateUserProfile(id, req.body, secure);
        res.status(204).json({message:"user is updated"});
    } catch (error) {
        res.status(500).json({ message: "le serveur a rencontré un probléme" });
    }
});


/**
 * @api {post} /api/users/profile/update/resetPassword send Email to reset password
 * @apiName SendEmailToResetPassword
 * @apiGroup User
 *
 * @apiParam {String} email
 *
 * @apiSuccess Success-response
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 
 *     {
 *      "message":"email has been sent"
 *     }
 *
 * @apiError InternalServer.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal server error
 *     {
 *       "message": "le serveur a rencontré un probléme"
 *     }
 */
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


/**
 * @api {post} /api/users/profile/update/password reset Password
 * @apiName resetpassword
 * @apiGroup User
 *
 * @apiParam {String} token
 * @apiParam {String} password
 *
 * @apiSuccess Success-response
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 
 *     {
 *      "message":"le mot de passe a bien été mis à jour"
 *     }
 *
 * @apiError InternalServer.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal server error
 *     {
 *       "message": "le serveur a rencontré un probléme"
 *     }
 * 
 * @apiError InvalidToken.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 498 Invalid Token
 *     {
 *       "message": "le token est invalid"
 *     }
 */
router.post('/profile/update/password', async(req, res)=>{
    const secure = true;
    const id = getId(req);
    try{
        const verifyToken = await resetTokenManager.verifyResetToken(req.body.token);

        if(verifyToken){
            await userController.updateUserProfile(id, {password: req.body.password}, secure);
            res.status(200).json({message:"le mot de passe a bien été mis à jour"});
        }else{
            res.status(498).json({message:"le token est invalide"});
        }
       
    }catch(error){
        res.status(500).json({message:"le serveur a rencontré un probléme"});
    }
})


router.get('/:userId', async (req, res) => {
    try {
        const user = await userController.getUserProfile(req.params.userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "le serveur a rencontré un probléme" });
    }
});

module.exports = router;

