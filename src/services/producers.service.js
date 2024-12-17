import { ProducerModel } from '../schemas/index.js';

export class ProducerService {
  async createProducer(producerData) {
    try {
      const producer = new ProducerModel(producerData);
      return await producer.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async saveOrUpdateProducer(producerData) {
    try {
      return await ProducerModel.findOneAndUpdate(
        { name: producerData.name },
        { $set: producerData },
        { new: true, upsert: true }).lean();
    } catch (error) {
    throw new Error(error.message);
  }
  }

  async getAllProducers() {
    try {
      return await ProducerModel.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProducerById(id) {
    try {
      return await ProducerModel.findById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProducer(id, producerData) {
    try {
      return await ProducerModel.findByIdAndUpdate(
        id,
        // $set is used to only update the fields that are passed in the request body
        { $set: producerData },
        { new: true }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProducer(id) {
    try {
      return await ProducerModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
