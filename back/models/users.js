import mongoose from 'mongoose'
import validator from 'validator'
import beautifyUnique from 'mongoose-beautiful-unique-validation'

const Schema = mongoose.Schema

const orderProductSchema = new Schema({
  p_id: {
    type: mongoose.ObjectId,
    ref: 'products'
  },
  amount: {
    type: Number,
    minlength: [1, '購買數量最小為1']
  },
  note: {
    type: String
  }
})

const orderSchema = new Schema({
  address: {
    type: String,
    required: [true, '缺少寄送地址']
  },
  howtoSend: {
    type: String,
    required: [true, '缺少寄送方式']
  },
  howTopay: {
    type: String,
    required: [true, '缺少付款方式']
  },
  isSend: {
    type: Boolean,
    require: [true, '缺少訂單狀態']
  },
  orderNumber: {
    type: String,
    required: [true, '缺少訂單編號']
  },
  date: {
    type: Date,
    required: [true, '缺少購買日期']
  },
  products: {
    type: [orderProductSchema]
  }
})

const userSchema = new Schema(
  {
    orders: {
      type: [orderSchema]
    },
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
    address: {
      type: String,
      required: [true, '請輸入地址']
    },
    isAdmin: {
      type: Boolean
    },
    isBan: {
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
