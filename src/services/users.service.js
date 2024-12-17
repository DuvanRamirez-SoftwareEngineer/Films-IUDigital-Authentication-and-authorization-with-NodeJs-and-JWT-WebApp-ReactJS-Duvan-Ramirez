import { UserModel } from '../schemas/index.js'
import { hashPassword } from '../helpers/index.js'

export class UserService {
  async createUser(userData) {
    try {
      const { role, password } = userData;
      let formatRole = ''
      if (role === 'admin') formatRole = 'ADMIN';
      if (role === 'user') formatRole = 'USER';
      userData.password = await hashPassword(password);
      userData.role = formatRole;
      const user = new UserModel(userData);
      return await user.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async saveOrUpdateUser(userData) {
    try {
      return await UserModel.findOneAndUpdate(
        { email: userData.email },
        { $set: userData },
        { new: true, upsert: true }
      ).lean();
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getAllUsers() {
    try {
      return await UserModel.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserById(id) {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUser(id, userData) {
    try {
      return await UserModel.findByIdAndUpdate(
        id,
        // $set is used to only update the fields that are passed in the request body
        { $set: userData },
        { new: true }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUser(id) {
    try {
      return await UserModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
