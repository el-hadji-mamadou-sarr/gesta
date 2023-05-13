const express = require("express");
const projectController = require("../controllers/projectController");
const router = express.Router();
const mongoose = require('mongoose');
const getIdFromToken = require('../utils/getIdFromToken');


/**
 * @api {POST} /api/projects/create
 * @apiName createNewProject
 * @apiGroup Project
 *
 * 
 * @apiParam {String} name
 * @apiParam {String} description
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 user found
 *     {
 *       message:"le projet a été crée" ,
 *     }
 *
 * @apiError InternalServer.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal server error
 *     {
 *       "message": "erreur au moment de la création"
 *     }
 */
router.post("/create", async (req, res) => {

  const data = {
    name: req.body.name,
    description: req.body.description,
    owner: new mongoose.Types.ObjectId(getIdFromToken(req))
  }

  try {
    const newProject = await projectController.createProject(data);
    res.status(201).json({ message: "le projet a été crée" });
  } catch (error) {
    res.status(500).json({ message: "erreur au moment de la création" });
  }
});

router.post



module.exports = router;