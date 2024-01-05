const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/gogoodmern';

  const mongoDB = async () => {
    try {
      await mongoose.connect(mongoURI, { useNewURLParser: true });
      console.log('Connected!');

      const fetched_data = mongoose.connection.db.collection("food_items");
      const data= await fetched_data.find({}).toArray();

      const foodCategory = await mongoose.connection.db.collection("foodCategory");
      const catData = await foodCategory.find({}).toArray();

      global.food_items = data;
      global.foodCategory = catData;
      // console.log(catData)
    } catch (error) {console.log('err: ', error);}
  };

module.exports = mongoDB;
