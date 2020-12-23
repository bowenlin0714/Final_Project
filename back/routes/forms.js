import express from 'express'
import { create, del, lists, edit } from '../controllers/forms.js'

const router = express.Router()

router.post('/create', create)
router.delete('/del/:id', del)
router.get('/', lists)
router.patch('/edit/:id', edit)

export default router
