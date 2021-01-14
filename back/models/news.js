import mongoose from 'mongoose'

const Schema = mongoose.Schema

const newsSchema = new Schema(
  {

    data: {
      type: Array
    }

  },
  {
    versionKey: false
  }
)

const news = mongoose.model('news', newsSchema)

export default news
