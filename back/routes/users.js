import express from 'express'
import { create, login, logout, heartbeat, accounts } from '../controllers/users.js'

const router = express.Router()

router.post('/create', create)
router.post('/login', login)
router.delete('/logout', logout)
router.get('/heartbeat', heartbeat)
router.get('/accounts', accounts)

export default router
