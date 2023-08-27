import { axiosPrivate } from './axios.js'

// Add City
const addCity = async (cityObject) => {
    axiosPrivate.post('/address/city', cityObject)
}

// Add Area
const addArea = async (areaObject) => {
    axiosPrivate.post('/address/area', areaObject)
}

export { addCity, addArea }