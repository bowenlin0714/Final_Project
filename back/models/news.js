import mongoose from 'mongoose'

const Schema = mongoose.Schema

const newsSchema = new Schema({
  data: {
    type: Array
  }

}
)
const news = mongoose.model('news', newsSchema)

export default news
