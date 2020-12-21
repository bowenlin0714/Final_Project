import mongoose from 'mongoose'
import validator from 'validator'
import beautifyUnique from 'mongoose-beautiful-unique-validation'

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: '稱謂重複',
      required: '稱謂必填'
    },
    account: {
      type: String,
      minlength: [4, '帳號必須四個字以上'],
      maxlength: [20, '帳號必須二十個字以下'],
      unique: '帳號重複',
      required: '帳號必填'
    },
    password: {
      type: String,
      required: [true, '請輸入密碼']
    },
    email: {
      type: String,
      required: [true, '缺少信箱欄位'],
      unique: '信箱重複',
      validate: {
        validator (value) {
          return validator.isEmail(value)
        },
        message: '信箱格式錯誤'
      }
    },
    phone: {
      type: String,
      required: [true, '請輸入手機號碼']
    },
    isAdmin: {
      type: Boolean
    }
  },
  {
    versionKey: false
  }
)

userSchema.plugin(beautifyUnique)

const users = mongoose.model('users', userSchema)

export default users
