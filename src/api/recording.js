import axios from 'axios'

export default {
  post: (recording) =>
    axios.post(`${process.env.VUE_APP_API_BASE}/recordings`, recording),
  list: () => axios.get(`${process.env.VUE_APP_API_BASE}/recordings`),
}