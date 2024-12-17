import { mongoose } from 'mongoose'

export const getConnectionMongoDB = async () => {
  const urlConnection = process.env.MONGODB_CONNECTION
  // const urlConnection = 'mongodb+srv://aleicer_vesga:jCCGGQb0uGKp26dP@iudigitaldb.w7v4d.mongodb.net/'
  try {
    await mongoose.connect(urlConnection)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}
