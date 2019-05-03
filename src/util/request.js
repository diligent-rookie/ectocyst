import axios from 'axios'
import { BASE_API_PREFIX } from '../config/index'

export default function (url, options, isJson) {
  const method = (options.method || 'get').toLowerCase()
  const opts = {
    url,
    method,
    baseURL: options.baseUrl || BASE_API_PREFIX,
  }

  const data = options.data || {}
  if (method === 'get') { opts.params = data } else {
    if (isJson) opts.data = data
    else opts.params = data
  }
  return axios(opts)
    .then((res) => {
      const response = res || {}
      return response.data
    })
    .catch((err) => {
      console.log(err.message)
      return {}
    })
}
