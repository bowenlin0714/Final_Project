import express from 'express'
import { create, login, logout, heartbeat, accounts, del, edit, finduser } from '../controllers/users.js'

const router = express.Router()

router.post('/create', create)
router.post('/login', login)
router.delete('/logout', logout)
router.get('/heartbeat', heartbeat)
router.get('/', accounts)
router.get('/:id', finduser)
router.delete('/del/:id', del)
router.patch('/edit/:id', edit)

export default router
