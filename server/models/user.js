const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {      
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      birthDate: {
        type: String,
        required: true,
      },
      isPrivate: {
        type: Boolean,
        required: true,
      },
    },
    {timestamps: {createdAt: 'registrationDate '}},
);

module.exports = model('User', userSchema);