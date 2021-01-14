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
    required: [true, '缺少購買數量'],
    minlength: [1, '購買數量最小為1']
  }
})

// const shopcarSchema = new Schema({

//   carProducts: {
//     type: [orderProductSchema]
//   }

// })
const messageSchema = new Schema({
  date: {
    type: String,
    required: [true, '缺少日期']
  },
  detail: {
    type: String,
    required: [true, '缺少信息內容']
  }
})

const orderSchema = new Schema({
  name: {
    type: String,
    required: [true, '缺少收件人姓名']
  },
  phone: {
    type: String,
    required: [true, '缺少收件人電話']
  },
  date: {
    type: String,
    required: [true, '缺少購買日期']
  },
  where: {
    type: String,
    required: [true, '缺少收貨地址']
  },
  method: {
    type: String,
    required: [true, '缺少寄送方式']
  },
  howtopay: {
    type: String,
    required: [true, '缺少付款方式']
  },
  shipment: {
    type: String,
    require: [true, '缺少出貨狀態']
  },
  payaccount: {
    type: String
  },
  ispaid: {
    type: Boolean
  },
  note: {
    type: String
  },
  shipping: {
    type: Number,
    required: [true, '缺少運費']
  },
  total: {
    type: Number,
    required: [true, '缺少總價']
  },
  products: {
    type: [orderProductSchema]
  }

})

const userSchema = new Schema(
  {

    name: {
      type: String,
      minlength: [1, '帳號必須一個字以上'],
      required: '稱謂必填'
    },
    lastbuydate: {
      type: String
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
      minlength: [4, '帳號必須四個字以上'],
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
    payaccount: {
      type: String
    },
    fav: {
      type: Array
    },
    toAdmin: {
      type: [messageSchema]
    },
    toMember: {
      type: [messageSchema]
    },
    isAdmin: {
      type: Boolean
    },
    isBan: {
      type: Boolean
    },
    shopcar: {
      type: [orderProductSchema]
    },
    orders: {
      type: [orderSchema]
    }
  },
  {
    versionKey: false
  }
)

userSchema.plugin(beautifyUnique)

const users = mongoose.model('users', userSchema)

export default users
