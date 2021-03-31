import axios from 'axios'

export default {
  post: (broadcast) =>
    axios.post(`${process.env.VUE_APP_API_BASE}/broadcasts`, broadcast),
  list: () => axios.get(`${process.env.VUE_APP_API_BASE}/broadcasts`),
  // put: (id, item) => axios.put(`${process.env.VUE_APP_API_BASE}/broadcasts/${id}`, item, { headers: { "Content-Type": "text/plain" } }),
  patch: (id, item) => axios.patch(`${process.env.VUE_APP_API_BASE}/broadcasts/${id}`, item, { headers: { "Content-Type": "application/json" } }),
  del: (id) => axios.delete(`${process.env.VUE_APP_API_BASE}/broadcasts/${id}`),
}