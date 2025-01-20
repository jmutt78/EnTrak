import axios from 'axios'

const traktClient = axios.create({
  baseURL: process.env.TRAKT_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'trakt-api-version': '2',
    'trakt-api-key': process.env.TRAKT_CLIENT_ID,
  },
})

export default traktClient
