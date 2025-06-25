const userModel = require("../models/userModel")

const bcrypt = require("bcrypt");


module.exports.getAllUsers = async (req,res)=>{
    try {
        const userList = await userModel.find({age:{$lt:20}}).sort({createdAt:-1}).limit(3)
        //const userList = await userModel.find().sort("age")

        if(userList.length == 0){
            throw new Error("Users not found");            
        }

        res.status(200).json(userList)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports.getUserById = async (req,res)=>{
    try {
        const {id} = req.params
        const user = await userModel.findById(id)
        
        if(! user){
            throw new Error("User not found");            
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports.deleteUserById = async (req,res)=>{
    try {
        const {id} = req.params
        const user = await userModel.findByIdAndDelete(id)
        
        if(! user){
            throw new Error("User not found");            
        }

        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}


module.exports.getUserByEmail = async (req,res)=>{
    try {
        const {email} = req.body
        const user = await userModel.find({email:email })
        
        if(! user){
            throw new Error("User not found");            
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}


module.exports.addClient = async (req,res)=>{
    try {
        //const {name , email , password} = req.body()
        const {name , email , password} = req.body
        //console.log("password:",password)
        const roleClient = "client"
        const user = new userModel({
            name , email , password , role : roleClient
        })
        const userAdded = await user.save()
        res.status(200).json(userAdded)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports.addAdmin = async (req,res)=>{
    try {
        const {name , email , password} = req.body
        const roleClient = "admin"
        const user = new userModel({
            name , email , password , role : roleClient
        })
        const userAdded = await user.save()
        res.status(200).json(userAdded)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports.updateUser = async (req,res)=>{
    try {
        const {id} = req.params
        const {age , name} = req.body
        const user = await userModel.findById(id)        
        if(! user){
            throw new Error("User not found");            
        }

        const updated = await userModel.findByIdAndUpdate(
            id,
            {
                $set : {name,age}
            }
        )

        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports.updatePassword = async (req,res)=>{
    try {
        const {id} = req.params
        const {newPassword} = req.body
        const user = await userModel.findById(id)        
        if(! user){
            throw new Error("User not found");            
        }


        const salt = await bcrypt.genSalt();

        const isSamePassword = await bcrypt.compare(newPassword,user.password)

    
        const newPasswordhashed = await bcrypt.hash(newPassword,salt); 
        /*const confirm = await bcrypt.compare(passwordhashed, user.password)

        if (!confirm) {
            throw new Error("probleme same password");}*/

        if(isSamePassword){
            throw new Error("probleme same password");            
        }

        const updated = await userModel.findByIdAndUpdate(
            id,
            {
                $set : {password : newPasswordhashed}
            }
        )

        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports.addClientWithImg = async (req,res)=>{
    try {
        const UserData = { ...req.body ,}


        UserData.role = "client"

        if(req.file){
            const {filename} = req.file;
            UserData.image_User = filename
        }
        const user = new userModel(
            UserData
        )
        const userAdded = await user.save()
        res.status(200).json(userAdded)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}