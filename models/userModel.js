// importing the mongoose module and create a schema
const mongoose = require('mongoose');
// For encrypting 
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

// Create a schema for the user
const userSchema = new Schema({
    username: {
        type: String,
        required: true
      },
    firstName: { 
        type: String, 
        required: true 
      },
    lastName: { 
        type: String,
        required: true
      },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true
    },
    discount: {
        type: Number,
    },
    mobile: {
        type: Number,
        required: true
      },
    cart: {
      type: [
        {
          _id: {
            type: Schema.Types.ObjectId,
          },
          oldId: {
            type: String,
          },
          title: {
            type: String,
          },
          price: {
            type: String,
          },
          stock: {
            type: Number,
          },
          ProductImage: {
            data: Buffer,
            contentType: String
          },
          category: {
            type: String,
          },
          description: {
            type: String,
          }
        }
      ]
    },
    wish: {
      type: [
        {
          title: {
            type: String,
          },
          price: {
            type: String,
          },
          stock: {
            type: Number,
          },
          ProductImage: {
            data: Buffer,
            contentType: String
          },
          category: {
            type: String,
          },
          description: {
            type: String,
          }
        }
      ]
    }
  });


  userSchema.pre('save',function(next){
    let user = this;
    if(this.isModified('password')|| this.isNew){
        bcrypt.genSalt(10,function(err,salt){
            if(err){
                next(err);
            }
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err){
                    next(err)
                }
                user.password = hash;
                next();
            })
        })
    }else{
       next();
    }
})

  // Create a model for the user
const User = mongoose.model('user', userSchema);

module.exports = User;