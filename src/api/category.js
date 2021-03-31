import axios from 'axios'

export default {
  category: () => axios.get(`${process.env.VUE_APP_API_BASE}/categorys`)
}