import { DirectorModel } from '../schemas/index.js'

export class DirectorService {
  async createDirector(directorData) {
    try {
      const director = new DirectorModel(directorData);
      return await director.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async saveOrUpdateDirector(directorData) {
    try {
      return await DirectorModel.findOneAndUpdate(
        { name: directorData.name },
        { $set: directorData },
        { new: true, upsert: true }
      ).lean();
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getAllDirectors() {
    try {
      return await DirectorModel.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getDirectorById(id) {
    try {
      return await DirectorModel.findById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateDirector(id, directorData) {
    try {
      return await DirectorModel.findByIdAndUpdate(
        id,
        // $set is used to only update the fields that are passed in the request body
        { $set: directorData },
        { new: true }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteDirector(id) {
    try {
      return await DirectorModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
