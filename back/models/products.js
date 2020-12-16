import mongoose from 'mongoose'
import beautifyUnique from 'mongoose-beautiful-unique-validation'

const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: '缺少商品名稱欄位',
      unique: '商品名稱重複'
    },
    description: {
      type: String,
      required: '缺少商品敘述'
    },
    price: {
      type: Number,
      required: '缺少商品價格'

    },
    productNumber: {
      type: String,
      unique: '商品編號重複',
      required: '缺少商品編號'
    },
    amount: {
      type: Number,
      required: '缺少商品數量'
    }
  }
)

productSchema.plugin(beautifyUnique)

const products = mongoose.model('products', productSchema)

export default products
