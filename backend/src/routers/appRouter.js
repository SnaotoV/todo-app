import express from 'express';
import app from '../controllers/appController'
const router = express.Router();

router.route('/todo')
.get(app.getAll)
.post(app.add)
router.route('/todo/:id')
.put(app.update)
.delete(app.deleteTodo)


module.exports = router;