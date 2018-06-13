const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleID:{
    type:String,
    required: true //should not be required if other login methods are available
  },
  email:{
    type:String,
    require:true
  },
  firstName:{
    type:String
  },
  lastName:{
    type:String
  },
  image:{
    type:String
  },
  admin:{
    type:Boolean,
    default: false
  },
  joinedLeagues: [{
    type: Schema.ObjectId,
    ref: 'leagues'
  }],
  adminLeagues: [{
    type: Schema.ObjectId,
    ref: 'leagues'
  }]
});

// Create collection and add Schema
mongoose.model('users', UserSchema);
