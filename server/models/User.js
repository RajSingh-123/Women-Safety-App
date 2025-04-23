const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const sosEventSchema = new mongoose.Schema({
  image: { type: String, required: true }, // Path to the image file
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  timestamp: { type: Date, default: Date.now },
});
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  contactDetails: {
    street: { type: String, required: true, trim: true },
    additionalInfo: { type: String, trim: true },
    zipCode: { type: String, trim: true },
    place: { type: String, trim: true },
    country: { type: String, trim: true },
    code: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    email: { type: String, trim: true }
  }, emergencyContacts: [{
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true }
  }],sosEvents:[sosEventSchema]
}, { timestamps: true });

// Apply passportLocalMongoose plugin to the schema
userSchema.plugin(passportLocalMongoose);

// Export the model
module.exports = mongoose.model('User', userSchema);
