import md5 from 'md5'
import users from '../models/users.js'
import util from 'util'

// 註冊
export const create = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    if (!(/^09[0-9]{8}$/.test(req.body.phone))) {
      res.status(400).send({ success: false, message: '手機格式不符' })
    } else if ((!(/^[0-9a-zA-Z_]+$/.test(req.body.account)))) {
      res.status(400).send({ success: false, message: '帳號只能是中英文和空格' })
    } else if (req.body.password.length < 4) {
      res.status(400).send({ success: false, message: '密碼必須四個字以上' })
    } else if (req.body.password.length > 20) {
      res.status(400).send({ success: false, message: '密碼必須二十個字以下' })
    } else {
      await users.create({
        name: req.body.name,
        account: req.body.account,
        password: md5(req.body.password),
        email: req.body.email,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        isBan: req.body.isBan,
        payaccount: req.body.payaccount,
        lastbuydate: '',
        usercart: []
      })
      res.status(200).send({ success: true, message: '' })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.log(error)
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'MongoError' && error.code === 11000) {
      res.status(400).send({ success: false, message: '帳號已使用' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 登入
export const login = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    const result = await users.findOne({
      account: req.body.account,
      password: md5(req.body.password)
    }, '-password')

    if (result === null) {
      res.status(404).send({ success: false, message: '帳號或密碼錯誤' })
    } else {
      req.session.user = result
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 登出
export const logout = async (req, res) => {
  req.session.destroy(error => {
    if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    } else {
      res.clearCookie()
      res.status(200).send({ success: true, message: '' })
    }
  })
}

export const heartbeat = async (req, res) => {
  let isLogin = false
  if (req.session.user !== undefined) {
    isLogin = true
  }
  res.status(200).send(isLogin)
}

// 找特定會員
export const finduser = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  try {
    const result = await users.findById(req.params.id).populate(['orders.products.p_id', 'shopcar.p_id'])
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)

    res.status(500).send({ success: false, message: '發生錯誤' })
  }
}

// 會員名單
export const accounts = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  // if (req.session.user.isAdmin !== true) {
  //   res.status(403).send({ success: false, message: '沒有權限' })
  //   return
  // }

  try {
    const result = await users.find().populate('orders.products.p_id')
    console.log(util.inspect(result, { showHidden: true, depth: null }))

    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)

    res.status(500).send({ success: false, message: '發生錯誤' })
  }
}

// 刪除
export const del = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (req.session.user.isAdmin !== true) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }

  try {
    const result = await users.findByIdAndDelete(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)

    res.status(500).send({ success: false, message: '發生錯誤' })
  }
}

// 編輯會員資料
export const edit = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
  }
  //   res.status(403).send({ success: false, message: '沒有權限' })
  //   return
  // }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    let result = await users.findById(req.params.id).populate('shopcar.p_id')
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      result = await users.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('shopcar.p_id')

      res.status(200).send({ success: true, message: '', result })
    }
    // } else if (req.session.user.isAdmin !== true) {
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

export const editorders = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }
  try {
    let result = await users.findById(req.params.id).populate('shopcar.p_id')
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      result = await users.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('shopcar.p_id')

      res.status(200).send({ success: true, message: '', result })
    }
    // } else if (req.session.user.isAdmin !== true) {
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
