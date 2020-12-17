import express from 'express'
import { create, del } from '../controllers/banners.js'

const router = express.Router()

router.post('/create', create)
router.delete('/del', del)
// router.get('/', banner)

export default router
