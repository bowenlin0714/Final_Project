import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bannerSchema = new Schema(
  {

    file: {
      type: String,
      required: [true, '缺少檔案名稱']
    },
    description: {
      type: String,
      required: [true, '缺少檔案敘述']
    },
    isEdit: {
      type: Boolean
    },
    isShow: {
      type: Boolean
    }

  },
  {
    versionKey: false
  }
)

const banners = mongoose.model('banners', bannerSchema)

export default banners
