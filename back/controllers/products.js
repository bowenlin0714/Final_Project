import multer from 'multer'
import FTPStorage from 'multer-ftp'
import axios from 'axios'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

import products from '../models/products.js'
import { log } from 'console'
// import { log } from 'console'

let storage

dotenv.config()
let number = 10

// 本機開發，檔案存電腦
// 雲端環境，檔案存 FTP
if (process.env.DEV === 'true') {
  storage = multer.diskStorage({
    destination (req, file, callback) {
      callback(null, 'images/products/')
    },
    filename (req, file, callback) {
      callback(null, file.originalname + Date.now() + path.extname(file.originalname))
    }
  })
} else {
  storage = new FTPStorage({
    // FTP 登入設定
    ftp: {
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: false
    },
    // 上傳的路徑含檔名
    // 路徑為 FTP 的絕對路徑
    destination (req, file, options, callback) {
      callback(null, file.originalname + Date.now() + path.extname(file.originalname))
    }
  })
}

const upload = multer({
  storage,
  fileFilter (req, file, callback) {
    if (!file.mimetype.includes('image')) {
      callback(new multer.MulterError('LIMIT_FORMAT'), false)
    } else {
      callback(null, true)
    }
  },
  limits: {
    fileSize: 1024 * 1024
  }
})

// 增加商品
export const createProductinfo = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
  } else if (req.session.user.isAdmin !== true) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  upload.array('image', 4)(req, res, async error => {
    if (error instanceof multer.MulterError) {
      let message = ''
      if (error.code === 'LIMIT_FORMAT') {
        message = '格式不符'
      } else {
        message = '上傳錯誤'
      }

      res.status(400).send({ success: false, message })
    } else if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    } else {
      try {
        const images = req.files.map(file => {
          const f = process.env.DEV === 'true' ? file.filename : path.basename(file.path)
          return {
            file: f,
            display: true
          }
        })
        const result = await products.create({
          user: req.session.user._id,
          name: req.body.name,
          category: req.body.category,
          productNumber: number,
          onShop: req.body.onShop,
          description: req.body.description,
          amount: req.body.amount,
          sold: req.body.sold,
          price: req.body.price,
          onsale: false,
          countPrice: req.body.countPrice,
          date: req.body.date,
          images,
          comments: []
        })
        res.status(200).send({ success: true, message: '', result })
      } catch (error) {
        console.log(error)
        if (error.name === 'ValidationError') {
          const key = Object.keys(error.errors)[0]
          const message = error.errors[key].message
          res.status(400).send({ success: false, message })
        } else if (error.name === 'CastError') {
          res.status(400).send({ success: false, message: '請輸入有效數字' })
        } else {
          res.status(500).send({ success: false, message: '伺服器錯誤' })
        }
      }
    }
  })
  number++
}

// 取得商品資訊
export const producttxt = async (req, res) => {
  try {
    const result = await products.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)

    res.status(500).send({ success: false, message: '發生錯誤' })
  }
}

export const productpic = async (req, res) => {
  // 開發環境回傳本機圖片
  if (process.env.DEV === 'true') {
    const path = process.cwd() + '/images/products/' + req.params.file
    const exists = fs.existsSync(path)
    if (exists) {
      res.status(200).sendFile(path)
    } else {
      res.status(404).send({ success: false, message: '找不到圖片' })
    }
  } else {
    axios({
      method: 'GET',
      url: 'http://' + process.env.FTP_HOST + '/' + process.env.FTP_USER + '/' + req.params.file,
      responseType: 'stream'
    }).then(ress => {
      ress.data.pipe(res)
    }).catch(error => {
      res.status(error.response.status).send({ success: false, message: '取得圖片失敗' })
    })
  }
}
// 編輯商品
export const edit = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
  }
  // else if (req.session.user.isAdmin !== true) {
  //   res.status(403).send({ success: false, message: '沒有權限' })
  //   return
  // }
  if (!req.headers['content-type']) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }
  try {
    let result = await products.findById(req.params.id)

    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      result = await products.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).send({ success: true, message: '', result })
    }
    // else if (req.session.user.isAdmin !== true) {
    //   res.status(403).send({ success: false, message: '沒有權限' })
    // }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 刪除商品
export const del = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
  } else if (req.session.user.isAdmin !== true) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }

  try {
    let result = await products.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      result = await products.findByIdAndDelete(req.params.id)
      res.status(200).send({ success: true, message: '', result })

      // 刪除本機圖片檔
      if (process.env.DEV === 'true') {
        fs.unlink('images/products/' + result.images[0].file, () => {})
      }
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const file = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }

  // 開發環境回傳本機圖片
  if (process.env.DEV === 'true') {
    const path = process.cwd() + '/images/products/' + req.params.file
    const exists = fs.existsSync(path)
    if (exists) {
      res.status(200).sendFile(path)
    } else {
      res.status(404).send({ success: false, message: '找不到圖片' })
    }
  } else {
    axios({
      method: 'GET',
      url: 'http://' + process.env.FTP_HOST + '/' + process.env.FTP_USER + '/' + req.params.file,
      responseType: 'stream'
    }).then(ress => {
      ress.data.pipe(res)
    }).catch(error => {
      res.status(error.response.status).send({ success: false, message: '取得圖片失敗' })
    })
  }
}
