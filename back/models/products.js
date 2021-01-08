import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    accounts: {
      type: String
    },
    comment: {
      type: String
    },
    stars: {
      type: Number,
      maxlength: [5, '最多5顆星']
    }
  }
)
const productImageSchema = new Schema(
  {
    file: {
      type: String
    },
    display: {
      type: Boolean
    }
  },
  {
    versionKey: false
  }
)

const productSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, '缺少商品名稱'],
    minlength: [2, '需兩字以上']
  },
  category: {
    type: String,
    required: [true, '缺少商品類別']
  },
  onShop: {
    type: Boolean
  },
  amount: {
    type: Number,
    required: [true, '缺少商品數量'],
    minlength: [0, '數量最小為0'],
    maxlength: [999999, '請輸入正確數量']
  },
  productNumber: {
    type: String,
    required: [true, '缺少商品編號'],
    minlength: [1, '編號最小為1'],
    unique: true
  },
  description: {
    type: String,
    required: [true, '缺少商品敘述']
  },
  sold: {
    type: Number,
    minlength: [0, '數量最小為0']
  },
  price: {
    type: Number,
    required: [true, '缺少商品價格'],
    minlength: [1, '數量最小為1']
  },
  onsale: {
    type: Boolean
  },
  countPrice: {
    type: Number
  },
  date: {
    type: String,
    required: [true, '缺少上架日期']

  },
  images: {
    required: [true, '缺少商品圖片'],
    type: [productImageSchema]
  },
  comments: {
    type: [commentSchema]
  }
})

const products = mongoose.model('products', productSchema)

export default products
