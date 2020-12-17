import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bannerSchema = new Schema(
  {
    user: {
      type: String,
      required: [true, '缺少使用者欄位']
    },
    file: {
      type: String,
      required: [true, '缺少檔案名稱']
    },
    description: {
      type: String,
      required: [true, '缺少檔案敘述']
    }

  },
  {
    versionKey: false
  }
)

const banners = mongoose.model('banners', bannerSchema)

export default banners
