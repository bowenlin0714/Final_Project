import express from 'express'
import { create, login, logout, heartbeat, accounts, del } from '../controllers/users.js'

const router = express.Router()

router.post('/create', create)
router.post('/login', login)
router.delete('/logout', logout)
router.get('/heartbeat', heartbeat)
router.get('/accounts', accounts)
router.delete('/del/:id', del)

export default router
