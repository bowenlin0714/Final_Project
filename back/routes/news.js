import express from 'express'
import { create, edit, getnews } from '../controllers/news.js'

const router = express.Router()

router.post('/create', create)
router.patch('/edit', edit)
router.get('/', getnews)

export default router
