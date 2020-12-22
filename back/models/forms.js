import mongoose from 'mongoose'
import validator from 'validator'

const Schema = mongoose.Schema

const formsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '缺少姓名']
    },
    phone: {
      type: String,
      required: [true, '缺少電話號碼']
    },
    email: {
      type: String,
      required: [true, '缺少電子信箱'],

      validate: {
        validator (value) {
          return validator.isEmail(value)
        },
        message: '信箱格式錯誤'
      }
    },
    opinion: {
      type: String,
      required: [true, '沒有內容'],
      minlength: [1, '沒有內容']
    },
    isRes: {
      type: Boolean,
      required: [true, '沒有回覆值']
    },
    date: {
      type: String,
      required: [true, '缺少日期']
    }
  },
  {
    versionKey: false
  }
)

const forms = mongoose.model('forms', formsSchema)

export default forms
