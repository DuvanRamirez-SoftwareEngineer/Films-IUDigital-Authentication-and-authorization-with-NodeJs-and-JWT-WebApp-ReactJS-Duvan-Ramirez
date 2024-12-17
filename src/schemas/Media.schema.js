import { Schema, model } from 'mongoose';

const MediaSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    serial: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    synopsis: { type: String, required: true },
    url: { type: String, required: true, unique: false },
    coverImage: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    releaseYear: { type: Date, required: true },
    genre: { type: Schema.Types.ObjectId, required: false, ref: 'Genre' },
    director: { type: Schema.Types.ObjectId, required: false, ref: 'Director' },
    producer: { type: Schema.Types.ObjectId, required: false, ref: 'Producer' },
    type: { type: Schema.Types.ObjectId, required: false, ref: 'Type' },
  },
  { timestamps: true }
);

export const MediaModel = model('Media', MediaSchema);
