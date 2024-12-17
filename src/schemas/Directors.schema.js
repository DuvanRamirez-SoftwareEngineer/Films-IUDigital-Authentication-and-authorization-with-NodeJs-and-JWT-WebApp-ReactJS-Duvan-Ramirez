import { Schema, model } from 'mongoose';

const DirectorSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true});

const DirectorModel = model('Director', DirectorSchema);
export { DirectorModel };
