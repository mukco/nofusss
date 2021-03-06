/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const potenCust = new Schema(
  {
    firstname: {
      type: String,
      required: [true, 'A first name is required'],
      min: 2,
      max: 40,
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, 'A last name is required'],
      min: 2,
      max: 40,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'An email address is required'],
      trim: true,
      validate: {
        validator(email) {
          return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            email,
          );
        },
        message: 'Please use a valid email address',
      },
    },
    message: {
      type: String,
      min: [10, 'Field cannot be empty'],
      max: 200,
      required: [true, 'We really wanna know how we can help.'],
    },
    location: {
      type: String,
      required: [true, 'We currently only service some locations.'],
      enum: ['Houston', 'San Antonio', 'Austin'],
    },
    currsupplier: {
      type: String,
      min: [10, 'Field cannot be empty'],
      max: 20,
      required: [true, 'This is required to personalize your quote'],
    },
    company: {
      type: String,
      min: 2,
      max: 40,
      trim: true,
      required: [true, 'A company is required'],
    },
    phonenumber: {
      type: String,
      trim: true,
      required: [true, 'A phone number is required.'],
      validate: {
        validator(number) {
          return /\d{3}-\d{3}-\d{4}/.test(number);
        },
        message: 'Please use a valid phone number',
      },
    },
  },
  {
    timestamps: true,
  },
);

const PotenCust = mongoose.model('PotenCust', potenCust);

module.exports = PotenCust;
