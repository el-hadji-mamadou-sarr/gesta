const request = require("supertest");
const express = require("express");
const projectRoutes = require("../server/routes/projectsRoutes");
const app = express();

app.use(express.json());
app.use("/api/projects", projectRoutes);

describe("Project Routes", () => {
    it("Should create a new project", async () => {
        // tu  dois t authentifier ici et récupérer le token JWT pour l'utiliser dans les tests

        const res = await request(app)
            .post("/api/projects/create")
            .set("Cookie", `jwtToken=${jwtToken}`)
            .send({
                name: "Test Project",
                // ... d'autres propriétés du projet
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual("Test Project");
        // ... testez d'autres propriétés du projet
    });

    // Ajoute d'autres tests pour d'autres routes et cas ici
});
