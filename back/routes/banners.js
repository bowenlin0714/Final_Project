import express from 'express'
import { create, del, edit, show } from '../controllers/banners.js'

const router = express.Router()

router.post('/create', create)
router.delete('/del/:id', del)
router.patch('/edit/:id', edit)
router.get('/', show)

export default router
