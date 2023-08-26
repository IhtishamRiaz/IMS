import mongoose from 'mongoose';

const areaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Area',
        default: 'nil'
    }
})

const Area = mongoose.model('Area', areaSchema)
const City = mongoose.model('City', citySchema)

export { Area, City }