import { City, Area } from '../models/addressModel.js';
import { validateArea, validateCity } from '../validations/accountValidator.js'

// @desc Add new Area
// @route POST /address/area
// @access Private
const addArea = async (req, res) => {
  try {
    // Validating incoming data
    const { error } = validateArea(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name } = req.body
    const lowerCaseName = name.toLowerCase();

    const areaExists = await Area.findOne({ name })
    if (areaExists) {
      return res.status(409).json({ message: 'Area Already Exists!' })
    }

    const areaObject = {
      name: lowerCaseName
    }

    const area = await Area.create(areaObject);

    if (area) {
      return res.status(201).json({ message: `New Area ${area?.name} Added!` })
    } else {
      return res.status(400).json({ message: 'Failed to Add Area' })
    }

  } catch (error) {
    res.status(500).json({ message: 'Failed to Add Area!', error })
  }
}

// @desc Get All Areas
// @route GET /address/area
// @access Private
const getAllAreas = async (req, res) => {
  try {
    const areas = await Area.find({}).lean()
    if (!areas || areas.length === 0) {
      return res.status(400).json({ message: 'No Area Found!' })
    }
    res.json(areas);
  } catch (error) {
    return res.status(500).json({ message: 'Could not get Areas', error })
  }
}

// @desc Add New City
// @route POST /address/city
// @access Private
const addCity = async (req, res) => {
  try {
    // Validating incoming data
    const { error } = validateCity(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, areaId } = req.body
    const lowerCaseName = name.toLowerCase();

    const cityExists = await City.findOne({ name })
    if (cityExists) {
      return res.status(409).json({ message: 'City Already Exists!' })
    }

    const cityObject = {
      name: lowerCaseName,
    }

    if (areaId) {
      cityObject.area = areaId
    }

    const city = await City.create(cityObject);

    if (city) {
      return res.status(201).json({ message: `New City ${city?.name} Added!` })
    } else {
      return res.status(400).json({ message: 'Failed to Add City' })
    }

  } catch (error) {
    res.status(500).json({ message: 'Failed to Add City!', error })
  }
}

// @desc Get All Cities
// @route GET /address/city
// @access Private
const getAllCities = async (req, res) => {
  try {
    const cities = await City.find({}).populate('area')
    if (!cities || cities.length === 0) {
      return res.status(400).json({ message: 'No City Found!' })
    }
    res.json(cities);
  } catch (error) {
    return res.status(500).json({ message: 'Could not get Cities', error })
  }
}

export { addArea, getAllAreas, addCity, getAllCities }