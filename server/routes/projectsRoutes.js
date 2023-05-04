const express = require("express");
const projectController = require("../controllers/projectController");
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


function getIdFromToken(req){
  const decoded = jwt.verify(req.cookies['jwtToken'], process.env.JWT_SECRET);
  return decoded._id;
}

router.post("/create", async (req, res) => {

    const data = {
      name:req.body.name,
      description:req.body.description,
      owner: new mongoose.Types.ObjectId(getIdFromToken(req))
    }

    try {
      const newProject = await projectController.createProject(data);
      res.status(201).json({message:"le projet a été crée"});
    } catch (error) {
      res.status(500).json({ message: "erreur au moment de la création" });
    }
  });



module.exports = router;