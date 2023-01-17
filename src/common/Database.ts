import mongoose from "mongoose";

const MONGO_URL = (
  process.env.NODE_ENV === "test" ? 
  "mongodb://localhost:27017/test-db" : 
  process.env.MONGO_URL
)

export class Database {
  public static connect = async ()=> {
    mongoose.set("strictQuery", false);

    await mongoose.connect(MONGO_URL);
  }

  public static disconnect = async ()=> {
    if(process.env.NODE_ENV === "test") {
      await mongoose.connection.db.dropDatabase();
    }
  
    await mongoose.connection.close();
  }
}
