const express = require("express");
const tabController = require("../controllers/tabController");
const router = express.Router();
const getId = require('../utils/getIdFromToken');


router.post("/add", async (req, res) => {
    const user_id = getId(req);
    try {
        await tabController.createTab(req.body, user_id);
        res.status(201).json({message:"tab created"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
