import { TypesModel } from '../schemas/index.js';

export class TypesService {
  async createTypes(typesData) {
    try {
      const types = new TypesModel(typesData);
      return await types.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllTypes() {
    try {
      return await TypesModel.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getTypesById(id) {
    try {
      return await TypesModel.findById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateTypes(id, typesData) {
    try {
      return await TypesModel.findByIdAndUpdate(
        id,
        { $set: typesData },
        { new: true }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteTypes(id) {
    try {
      return await TypesModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
