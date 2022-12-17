import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const exports = {
    getAll,
    create,
    update
}

export default exports