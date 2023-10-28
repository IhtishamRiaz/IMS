// import { axiosPrivate } from './axios.js'
// import { toast } from 'sonner';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import React from 'react';

// Add new Area
const addArea = async (data) => {
  const axiosPrivate = useAxiosPrivate()

  return await axiosPrivate.post('/address/area', data)
}

// Get all Areas
const getAllAreas = async () => {
  const axiosPrivate = useAxiosPrivate()

  const response = await axiosPrivate.get('/address/area')
  return response.data
}

// Add new City
const addCity = async (data) => {
  const axiosPrivate = useAxiosPrivate()

  return await axiosPrivate.post('/address/city', data)
}

// Get all Cities
const getAllCities = async () => {
  const axiosPrivate = useAxiosPrivate()

  const response = await axiosPrivate.get('/address/city')
  return response.data
}

export { addCity, getAllCities, addArea, getAllAreas }