import axios from "axios"

import { MediaService, DirectorService, GenreService, ProducerService } from './index.js'
import { genreArray, producerRandomDescription, directors } from "../helpers/index.js"


export class SearchService {
  async getAllInformation(films) {
    const filmInformation = []
    for (const film of films.results) {
      const getInfoConfig = {
        method: 'GET',
        url: `${process.env.TMDB_API}movie/${film.id}?language=es-CO`,
        headers: {
          'Authorization': `Bearer ${process.env.TMDB_API_TOKEN}`
        }
      }
      try {
        const { data } = await axios.request(getInfoConfig)
        const genre = {
          name: data.genres[0].name,
          description: genreArray.find(genre => genre.id === data.genres[0].id).description,
          status: 'activo'
        }
        const randomIndexProducer = Math.floor(Math.random() * producerRandomDescription.length)
        const producer = {
          name: data.production_companies[0].name,
          status: 'activo',
          slogan: producerRandomDescription[randomIndexProducer].slogan,
          description: producerRandomDescription[randomIndexProducer].description
        }
        const randomIndexDirector = Math.floor(Math.random() * directors.length)
        const director = {
          name: directors[randomIndexDirector].name,
          status: 'activo'
        }
        const type = { name: 'película', status: 'activo' }
        const filmData = {
          serial: data.id,
          title: data.title,
          synopsis: data.overview,
          url: `https://film-iudigital.com/info-film/${data.id}`,
          coverImage: `https://image.tmdb.org/t/p/original${data.poster_path}`,
          status: 'activo',
          releaseYear: data.release_date,
          type,
          genre,
          producer,
          director
        }
        const mediaSave = structuredClone(filmData)
        const saveMedia = await this.saveMedia(filmData)
        mediaSave._id = saveMedia._id
        filmInformation.push(mediaSave)
      } catch (error) {
        console.log(error.message)
      }
    }
    return filmInformation
  }

  async saveMedia(data) {
    const mediaService = new MediaService()
    const genreService = new GenreService()
    const producerService = new ProducerService()
    const directorService = new DirectorService()

    const media = await mediaService.getMediaBySerial(data.serial)
    if (media) return
    const typeId = data.type.name === 'película' ? '66dccd64b385cb3b47dfd765' : '66dccd8bb385cb3b47dfd767'
    try {
      const genreId = await genreService.saveOrUpdateGenre(data.genre)
      const producerId = await producerService.saveOrUpdateProducer(data.producer)
      const directorId = await directorService.saveOrUpdateDirector(data.director)
      data.type = typeId
      data.genre = genreId._id
      data.producer = producerId._id
      data.director = directorId._id
      return await mediaService.createMedia(data)
    } catch (error) {
      console.log(error.message)
    }

  }

  async search(query) {
    const dataConfig = {
      method: 'GET',
      url: `${process.env.TMDB_API}search/movie?query=${encodeURI(query)}&language=es-CO`,
      headers: {
        'Authorization': `Bearer ${process.env.TMDB_API_TOKEN}`
      }
    }
    try {
      const { data } = await axios.request(dataConfig)
      if (data) return this.getAllInformation(data)
      return []
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
