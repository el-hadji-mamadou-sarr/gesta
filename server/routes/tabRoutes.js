const express = require("express");
const tabController = require("../controllers/tabController");
const router = express.Router();
const getId = require('../utils/getIdFromToken');

/**
 * @api {POST} /api/tabs/:project_id/add
 * @apiName AddTab
 * @apiGroup Tab
 *
 * 
 * @apiBody {String} name 
 * @apiBody {String} desciption
 *  
 * @apiParam {String} project_id 
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 
 *     {
 *       message:"tab added",
 *     }
 *
 * @apiError InternalServer.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal server error
 *     {
 *       "message": "le serveur a rencontré un probléme"
 *     }
 */
router.post("/:project_id/add", async (req, res) => {
    
    const user_id = getId(req);
    try {
        await tabController.createTab(req.params.project_id, req.body, user_id);
        res.status(201).json({message:"tab created"});
    } catch (error) {
        res.status(500).json({ message: "le serveur a rencontré un probléme"});
    }
});

module.exports = router;
