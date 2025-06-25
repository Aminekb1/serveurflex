const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      require: true,
      unique:true,
    },
    password: {
      type: String,
      require: true,
    

      /*validate: {
      validator: function (value) {
         return /^( ?=. "[a-z])( ?=. "[A-Z])( ?=. "\d)( ?=.* [\W_]).{8,}$/.test(value); 
      },
      message:
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un caractere special" },*/
    },
   // role: { type: String, enum: ["client", "admin", "moderateur"] },
    role: { type: String, enum: ["client", "admin"] },
    age: Number,
    etat: Boolean,
    image_User: { type: String, default: "client.png" },
        //Rleation
 //   Notification: [{type: mongoose.Schema.Types.ObjectId, ref:"Notif" }], // Many 
    cars: [{type: mongoose.Schema.Types.ObjectId, ref:"Car" }] // Many 
    //car: {type: mongoose.Schema.Types.ObjectId, ref:"Car" } // one 
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
   //  console.log("User:",User)
    const User = this;
    const salt = await bcrypt.genSalt();
    //console.log("salt :",salt)
    //console.log("test :")
    User.password = await bcrypt.hash(User.password,salt);  
    //console.log("password :",User.password)
    //
    User.etat = false;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;