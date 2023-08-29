import { axiosPrivate } from './axios.js'


// Add new Area
const addArea = async (data) => {
    return await axiosPrivate.post('/address/area', data)
}

// Get all Areas
const getAllAreas = async () => {
    const response = await axiosPrivate.get('/address/area')
    return response.data
}

// Add new City
const addCity = async (data) => {
    return await axiosPrivate.post('/address/city', data)
}

// Get all Cities
const getAllCities = async () => {
    const response = await axiosPrivate.get('/address/city')
    return response.data
}

export { addCity, getAllCities, addArea, getAllAreas }