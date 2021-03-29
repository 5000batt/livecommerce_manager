import axios from 'axios'

export default {
  post: (broadcast) =>
    axios.post(`${process.env.VUE_APP_API_BASE}/broadcasts`, broadcast),
  list: () => axios.get(`${process.env.VUE_APP_API_BASE}/broadcasts`),
  del: (id) => axios.delete(`${process.env.VUE_APP_API_BASE}/broadcasts/${id}`),
}