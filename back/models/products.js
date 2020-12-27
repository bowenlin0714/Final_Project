import mongoose from 'mongoose'
import beautifyUnique from 'mongoose-beautiful-unique-validation'

const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    user: {
      type: String,
      required: [true, '缺少使用者欄位']
    },
    productName: {
      type: String,
      unique: '商品名稱重複',
      required: [true, '缺少商品名稱'],
      minlength: [1, '說明必須 2 字以上']
    },
    category: {
      type: String,
      required: [true, '商品類別不可為空']
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
      required: [true, '缺少商品價格']
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

productSchema.plugin(beautifyUnique)

const products = mongoose.model('products', productSchema)

export default products
