const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  // _id:{
  //   type: mongoose.Schema.Types.ObjectId
  // },
  username: {
    type: String,
  },
  password:{
    type:String
  },
  name:{
    type:String
  },
  token:{
    type:String,
    required:false
  },
  roleId:{
    type:String
  },
}, {
  timestamps: true
}
);

const UsersSchema = mongoose.model('User', userSchema);

module.exports = UsersSchema;