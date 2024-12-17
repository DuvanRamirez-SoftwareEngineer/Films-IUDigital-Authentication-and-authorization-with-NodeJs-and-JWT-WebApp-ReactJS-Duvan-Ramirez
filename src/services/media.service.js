import { MediaModel } from "../schemas/index.js"

export class MediaService {
  async createMedia(mediaData) {
    try {
      const media = new MediaModel(mediaData)
      return await media.save()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getAllMedia() {
    try {
      return await MediaModel.find()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getMediaById(id) {
    try {
      return await MediaModel.findById(id)
        .populate('type')
        .populate('genre')
        .populate('producer')
        .populate('director')
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getMediaBySerial(serial) {
    try {
      return await MediaModel.findOne({ serial: serial }).lean()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateMedia(id, mediaData) {
    try {
      return await MediaModel.findByIdAndUpdate(id, mediaData, { new: true })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteMedia(id) {
    try {
      return await MediaModel.findByIdAndDelete(id)
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
