import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
}, { timestamps: true });

const UserModel = model('User', UserSchema)
export { UserModel }
