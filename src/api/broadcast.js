import axios from 'axios'

export default {
  post: (broadcast) =>
    axios.post(`${process.env.VUE_APP_API_BASE}/broadcasts`, broadcast),
  uploadFile: (broadcastId, form) =>
    axios.post(`${process.env.VUE_APP_API_BASE}/broadcasts/${broadcastId}/broadcast-files`,
      form, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }),
  list: () => axios.get(`${process.env.VUE_APP_API_BASE}/broadcasts`),
  patch: (id, item) => axios.patch(`${process.env.VUE_APP_API_BASE}/broadcasts/${id}`, item, { headers: { "Content-Type": "application/json" } }),
  del: (id) => axios.delete(`${process.env.VUE_APP_API_BASE}/broadcasts/${id}`),
  register: (id) => axios.post(`${process.env.VUE_APP_API_BASE}/register-broadcasts/${id}`)
}