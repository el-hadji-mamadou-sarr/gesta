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
