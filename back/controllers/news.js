import Axios from 'axios'
import news from '../models/news.js'

export const addnews = async (req, res) => {
  try {
    // if (!(/^09[0-9]{8}$/.test(req.body.phone))) {
    //   res.status(400).send({ success: false, message: '手機格式不符' })
    // } else if (
    //   res.status(400).send({ success: false, message: '日期格式不符' })
    // } else {
    //   await forms.create({
    //     name: req.body.name,
    //     phone: req.body.phone,
    //     email: req.body.email,
    //     opinion: req.body.opinion,
    //     isRes: req.body.isRes,
    //     date: req.body.date
    //   })
    //   res.status(200).send({ success: true, message: '' })
    // }
    Axios.get('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6').then(res => {
      console.log(res)
      news.create(res)
    })
  } catch (error) {
    console.log(error)
  }
}
