const express = require("express");
const projectController = require("../controllers/projectController");
const router = express.Router();
const { jwtAuthMiddleware } = require("../middlewares/auth");

router.post("/create", jwtAuthMiddleware, async (req, res) => {
  try {
    const newProject = await projectController.createProject(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
