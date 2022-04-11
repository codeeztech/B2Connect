const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roleSchema = new Schema({
    // _id:
    // {
    //    type: mongoose.Schema.Types.ObjectId,
    //    required:false
    // },
    roleId: {
       type: String
    },
    roleName: {
        type: String
     }
} ,
{
    timestamps: true
  }
);

const RolesSchema = mongoose.model('Role', roleSchema);

module.exports = RolesSchema;