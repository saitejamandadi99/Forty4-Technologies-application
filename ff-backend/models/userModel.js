const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true,unique:true},
    phone: {type:String, required:true,unique:true},
    company:{type:String,required:true},
    address: {
        street: {type: String, required: true},
        city: {type: String, required: true},
        zipCode: {type: String, required: true},
        country: {type: String, required: true, default: 'India'},
        
        // Geolocation for maps/location services
        geo: {
            latitude: {type: Number, min: -90, max: 90, required: true},
            longitude: {type: Number, min: -180, max: 180, required: true}
        }
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt
});

module.exports = mongoose.model('User',userSchema);