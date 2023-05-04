const express = require("express");
const tabController = require("../controllers/tabController");
const router = express.Router();


// gestionnaire de route
router.post("/create", async (req, res) => {
    console.log("Request body:", req.body); //verifie l'erreur
    try {
        const newTab = await tabController.createTab(req);
        res.status(201).json(newTab);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
