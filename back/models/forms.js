import mongoose from 'mongoose'
import validator from 'validator'

const Schema = mongoose.Schema

const formSchema = new Schema(
  {
    name: {
      type: String
    },
    phone: {
      type: String
    },
    email: {
      type: String,
      validate: {
        validator (value) {
          return validator.isEmail(value)
        },
        message: '信箱格式錯誤'
      }
    },
    opinion: {
      type: String,
      minlength: [1, '沒有內容']
    }
  }
)

const forms = mongoose.model('forms', formSchema)

export default forms
