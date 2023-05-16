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
  const user_id = getIdFromToken(req);
  const data = {
    name: req.body.name,
    description: req.body.description,
    owner: new mongoose.Types.ObjectId(user_id)
  }

  try {
    const newProject = await projectController.createProject(data, user_id);
    res.status(201).json({ message: "le projet a été crée" });
  } catch (error) {
    res.status(500).json({ message: "erreur au moment de la création" });
  }
});


/**
 * @api {GET} /api/projects/:project_id
 * @apiName getProject
 * @apiGroup Project
 *
 * 
 * @apiParam {String} id_project
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 user found
 *     {Project}
 *     
 *
 * @apiError InternalServer.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal server error
 *     {
 *       "message": "le project n'a pas été trouvé"
 *     }
 */
router.get("/:id_project", async(req, res)=>{

  try {
    
    const project = await projectController.getProject(req.params.id_project);
    res.status(200).json(project);
  }catch(error){
    res.status(500).json({message:"erreur lors de la recherche du projet"})
  }
})



module.exports = router;