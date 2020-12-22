import express from 'express'
import { create, del, lists } from '../controllers/forms.js'

const router = express.Router()

router.post('/create', create)
router.delete('/del/:id', del)
router.get('/', lists)

export default router
