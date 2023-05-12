const express = require("express");
const tabController = require("../controllers/tabController");
const router = express.Router();
const getId = require('../utils/getIdFromToken');


router.post("/add", async (req, res) => {
    
    console.log("Tab route reached");
    const user_id = getId(req);
    try {
        console.log(user_id)
        await tabController.createTab(req.body, user_id);
        res.status(201).json({message:"tab created"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
