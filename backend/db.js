const mongoose = require('mongoose')
const mongoURL = 'mongodb+srv://foodcode:foodcode123@cluster0.u6xhrak.mongodb.net/foodcode?retryWrites=true&w=majority&appName=Cluster0'

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log('Connected');

    const collection = mongoose.connection.db.collection("foodData2");
    const data = await collection.find({}).toArray();

    const foodCatogary = mongoose.connection.db.collection("foodCatogary");
    const catData = await foodCatogary.find({}).toArray(); // Use await here

    // Assign the fetched data to global variables
    global.foodData2 = data;
    global.foodCatogary = catData;

    // Log the data to verify
    console.log(global.foodData2);
    console.log(global.foodCatogary);

  } catch (err) {
    console.error('Error connecting to MongoDB or fetching data:', err);
  }
};

module.exports = mongoDB;