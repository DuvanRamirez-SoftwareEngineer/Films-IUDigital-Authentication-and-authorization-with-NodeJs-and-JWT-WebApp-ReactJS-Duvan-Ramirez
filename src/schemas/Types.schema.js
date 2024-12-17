import { Schema, model } from 'mongoose';

const TypesSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const TypesModel = model('Type', TypesSchema);
export { TypesModel };
