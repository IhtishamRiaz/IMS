import { City, Area } from '../models/addressModel.js';

// @desc Add new Area
// @route POST /address/area
// @access Private
const addArea = async (req, res) => {
    try {
        const { name } = req.body

        const areaObject = {
            name: name
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
        if (!areas?.length) {
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
        const { name, areaId } = req.body

        const cityObject = {
            name: name,
            area: areaId
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