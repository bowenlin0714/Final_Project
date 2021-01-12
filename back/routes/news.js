import express from 'express'
import { addnews } from '../controllers/news.js'

const router = express.Router()

router.get('/', addnews)

export default router
