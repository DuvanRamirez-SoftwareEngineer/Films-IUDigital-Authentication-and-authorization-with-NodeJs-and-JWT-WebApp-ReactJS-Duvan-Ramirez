import { GenreModel } from '../schemas/index.js'

export class GenreService {
  async createGenre(genreData) {
    try {
      const genre = new GenreModel(genreData)
      return await genre.save()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async saveOrUpdateGenre(genreData) {
    try {
      return  await GenreModel.findOneAndUpdate(
        { name: genreData.name },
        { $set: genreData },
        { new: true, upsert: true }
      ).lean()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getAllGenres() {
    try {
      return await GenreModel.find()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getGenreById(id) {
    try {
      return await GenreModel.findById(id)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateGenre(id, genreData) {
    try {
      return await GenreModel.findByIdAndUpdate(
        id,
        { $set: genreData },
        { new: true }
      )
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteGenre(id) {
    try {
      return await GenreModel.findByIdAndDelete(id)
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
