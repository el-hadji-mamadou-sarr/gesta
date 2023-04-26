# Projet GESTA

![GEsta-logo](https://user-images.githubusercontent.com/67522046/234556224-f183a14a-a1f0-4ea5-b80b-ac57d4928b3e.png)

Une plateforme en ligne permettant aux utilisateurs de gérer des projets collaboratifs. 

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
