import express from 'express'
import controller from './controller'
// import { adminAuthentication } from '../../middleware';
import validator from '../validator'

const router = express.Router()

router.post('/', validator.category.create, controller.create)
router.patch('/:id', controller.update)
router.patch('/updatecount/:id',controller.updatecount)
router.get('/', controller.index)
router.get('/:id', controller.show)
router.get('/get/:id',controller.show1)
router.delete('/:id', controller.deleteRecord)

export default router
