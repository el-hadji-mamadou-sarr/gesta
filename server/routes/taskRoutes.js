const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();
const getId = require('../utils/getIdFromToken');



/**
 * @api {POST} /api/tasks/:project_id/:tab_id/:section_id/add
 * @apiName AddTask
 * @apiGroup Task
 *
 * 
 * @RequestParam {String} project_id 
 * @RequestParam {String} tab_id 
 * @RequestParam {String} section_id
 * 
 *  
 * @RequestBody {String} name 
 * @RequestBody {String} description 
 * @RequestBody {date} due_date 
 * @RequestBody {OjectId[]} assigned_to[]  
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 
 *     {
 *       message:"task created" ,
 *     }
 *
 * @apiError InternalServer.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal server error
 *     {
 *       "message": "le serveur a rencontré un probléme"
 *     }
 */
router.post('/:project_id/:tab_id/:section_id/add', async (req, res) => {
    const userId = getId(req);

    try {
       await taskController.addTask(req.body, req.params,  userId);
        res.status(200).json({ message: 'Task added successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
