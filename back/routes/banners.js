import express from 'express'
import { create, banners, del } from '../controllers/banners.js'

const router = express.Router()

router.post('/create', create)
router.get('/del', del)
router.delete('/', banners)

export default router
