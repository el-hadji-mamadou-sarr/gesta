# Projet GESTA

![GEsta-logo](https://user-images.githubusercontent.com/67522046/234556224-f183a14a-a1f0-4ea5-b80b-ac57d4928b3e.png)

Une plateforme en ligne permettant aux utilisateurs de gérer des projets collaboratifs. 




# Docker services 
# Server & Client

Pour lancer le server construissez et éxecuter les deux services séparément à l'aide de Docker. :

coté client : 

```docker build -t gesta-client
   docker run -p 3000:5000 gesta-client

```

coté serveur

```docker build -t gesta-server
    docker run -p 3000:5000 gesta-server
```

**Mettre les variables d'environnement dans .env oubien crée ton .env.local

## Systéme d'authentification

* `http://localhost:5000/api/auth/login` 

Dans la corps de la requéte envoyer :

```javascript 
body: JSON.stringify({
        email: userValue.email,
        password: userValue.password
})       
```

* `http://localhost:5000/api/auth/register`

Dans le corps de la requéte

```javascript 
body: JSON.stringify({
        fullname : userValue.fullname,
        email: userValue.email,
        password: userValue.password
})
```

* A la réception vous pouvez utilisez cet exemple pour rediriger l'utilisateur:

```javascript
.then((res)=>{
        if(res.status === 200){
                res.json().then((res)=>{
                        navigate('/home');
                })
        }
})
```
## documentation api liés au profile de l'utilisateur

### récupérer le profile de l'utilisateur

```javascript
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
```

### changer les données publiques de l'utilisateur

```javascript
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
```

### envoyer l'email de changement du mot de passe

```javascript
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
```

### changement du mot de passe

```javascript
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
```
