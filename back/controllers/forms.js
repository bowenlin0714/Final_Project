import forms from '../models/forms.js'

// 增加表單
export const create = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    if (!(/^09[0-9]{8}$/.test(req.body.phone))) {
      res.status(400).send({ success: false, message: '手機格式不符' })
    } else if (
      !(/^[0-9]{4}[/\-](0[1-9]|1[012])[/\-](0[1-9]|[12][0-9]|3[01])$/).test(req.body.date)) {
      res.status(400).send({ success: false, message: '日期格式不符' })
    } else {
      await forms.create({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        opinion: req.body.opinion,
        isRes: req.body.isRes,
        date: req.body.date
      })
      res.status(200).send({ success: true, message: '' })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.log(error)
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 刪除表單
export const del = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
  } else if (req.session.user.isAdmin !== true) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }

  try {
    let result = await forms.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else if (req.session.user.isAdmin !== true) {
      res.status(403).send({ success: false, message: '沒有權限' })
    } else {
      result = await forms.findByIdAndDelete(req.params.id)
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 展示表單
export const lists = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (req.session.user.isAdmin !== true) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }

  try {
    const result = await forms.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)

    res.status(500).send({ success: false, message: '發生錯誤' })
  }
}

// 編輯表單
export const edit = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
  } else if (req.session.user.isAdmin !== true) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
  if (!req.headers['content-type']) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    let result = await forms.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else if (req.session.user.isAdmin !== true) {
      res.status(403).send({ success: false, message: '沒有權限' })
    } else {
      result = await forms.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).send({ success: true, message: '', result })
    }
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
