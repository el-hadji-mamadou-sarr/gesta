const express = require('express');
const sectionController = require('../controllers/sectionController');
const router = express.Router();
const getId = require('../utils/getIdFromToken');


/**
 * @api {POST} /api/sections/:project_id/:tab_id/add
 * @apiName AddSection
 * @apiGroup Section
 *
 * 
 * @apiParam {String} name 
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 
 *     {
 *       message:"section added" ,
 *     }
 *
 * @apiError InternalServer.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal server error
 *     {
 *       "message": "le serveur a rencontré un probléme"
 *     }
 */
router.post('/:project_id/:tab_id/add', async (req, res) => {
    try {
        await sectionController.addSection(req.body, req.params);
        res.status(200).json({ message: 'Section added successfully' });
    } catch (error) {
        res.status(500).json({ message: "le serveur a rencontré un probléme" });
    }
});


module.exports = router;
