import news from '../models/news.js'
import axios from 'axios'
import cheerio from 'cheerio'

export const create = async (req, res) => {
  try {
    // 插入新聞
    const array = []
    axios.get('https://www.toy-people.com/').then(res => {
      const $ = cheerio.load(res.data)
      const textdata = $('.text h2 .bold_face ')
      const imgdata = $('.list > .image > a')
      const timedata = $('.times ')
      const inertext = $('.text > p ')

      for (let i = 0; i < textdata.length; i++) {
        const data = {
          href: textdata.eq(i).attr('href'),
          text: textdata.eq(i).text(),
          img: imgdata.eq(i).css('background-image'),
          times: timedata.eq(i).text(),
          innertext: inertext.eq(i).text()
        }
        array.push(data)
      }
      console.log(array)
      const result = news.create({
        data: array
      })
      res.status(200).send({ success: true, message: '', result })
    })
  } catch (err) {
    console.log(err)
  }
}

export const edit = async (req, res) => {

}
export const getnews = async (req, res) => {
  try {
    const result = await news.find()

    res.status(200).send({ success: true, message: '', result })

    console.log(result)
  } catch (err) {
    console.log(err)
  }
}
