import express from 'express'
import { create, del } from '../controllers/forms.js'

const router = express.Router()

router.post('/', create)
router.delete('/:id', del)

export default router
