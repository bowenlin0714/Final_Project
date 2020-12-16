import mongoose from 'mongoose'

const Schema = mongoose.Schema

const albumSchema = new Schema(
  {
    user: {
      type: String,
      required: [true, '缺少使用者欄位']
    },
    productName: {
      type: String,
      required: [true, '商品名字不可為空'],
      minlength: [1, '說明必須 2 字以上']
    },
    description: {
      type: String,
      required: [true, '缺少商品敘述'],
      minlength: [1, '說明必須 2 字以上'],
      maxlength: [200, '說明必須 200 字以下']
    },
    amount: {
      type: Number,
      min: [0, '請輸入有效數量'],
      required: [true, '缺少商品數量']

    },
    price: {
      type: Number,
      min: [0, '請輸入有效價格'],
      required: [true, '缺少商品數量']
    },
    file: {
      type: String,
      required: [true, '缺少檔案名稱']
    }
  },
  {
    versionKey: false
  }
)

const albums = mongoose.model('albums', albumSchema)

export default albums
