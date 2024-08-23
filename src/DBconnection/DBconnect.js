const mongoose = require("mongoose");


const connectDB = () => {
  const mongouri = process.env.DATABASE_URL;
  
  try {
       mongoose.connect( 
      mongouri,
      // {
      //   useUnifiedTopology: true,
      //   useNewUrlParser: true,
      //   // version: ServerApiVersion.v1,
      // },
      console.log("connected to database")
    );
  } catch (error) {
    console.log(error);
 
  }
};

module.exports = connectDB;