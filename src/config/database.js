const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect('mongodb+srv://rajhvimal1996:TgOTez5zIYl7oeF7@namastenodejs.pzdpv.mongodb.net/devTinder');
}

module.exports = {
connectDB
}