import express from 'express'
import { edit, del, producttxt, productpic, createProductinfo } from '../controllers/products.js'

const router = express.Router()

router.post('/create', createProductinfo)
router.patch('/edit/:id', edit)
router.delete('/del/:id', del)
router.get('/', producttxt)
router.get('/:file', productpic)

export default router
