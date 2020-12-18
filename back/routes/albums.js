import express from 'express'
import { create, edit, del, user, file } from '../controllers/albums.js'

const router = express.Router()

router.post('/', create)
router.patch('/:id', edit)
router.delete('/:id', del)
router.get('/user/:user', user)
router.get('/file/:file', file)

export default router
