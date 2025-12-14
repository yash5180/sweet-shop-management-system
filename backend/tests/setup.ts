import mongoose from "mongoose";

beforeAll(async () => {
  const mongoUri =
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/sweetshop_test";

  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});
