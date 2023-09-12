const mongoose = require('mongoose')
// main().catch((err) => console.log(err))
module.exports = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/inotebookDB')
    console.log('connected to MongoDB')
  } catch (e) {
    console.log(e)
    process.exit()
  }
}
