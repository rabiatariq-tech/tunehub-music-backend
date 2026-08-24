const userModel = require('../model/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function registerUser(req,res){

    const {username, email, password, role = "user"} = req.body;

    const isUserAlreadyExist = await userModel.findOne({
            $or : [
                {username},
                {email}
            ]
        })

    if(isUserAlreadyExist){
        return res.status(409).json({ message : "User already exists" })
    }

    const hash =  await bcrypt.hash(password,10) //10 is the salting value(adds uniq,random value in the pass before hashing to make decript difficult)

  const user = userModel.create({
    username,
    email,
    password : hash,
    role
  })

  const token = jwt.sign({
    _id : user._id,
    role : user.role
  },process.env.JWT_SECRET)

  res.cookie("token",token)

  res.status(201).json({
    message : "User created successfully",
    user:{
        id : user._id,
        role : user.role
    }
  })

}

async function loginUser(req,res){
  
  const {username, email, password, role } = req.body;

  const user = await userModel.findOne({
    $or : [
        {username},
        {email}
    ]
})

if(!user){
  return res.status(401).json({ message : "Invalid Credentials" })
}

const isPasswordValid =await bcrypt.compare(password , user.password);

if(!isPasswordValid){
  return res.status(401).json({ message : "Invalid Credentials" })
}

const token = jwt.sign({
  _id : user._id,
  role : user.role
},process.env.JWT_SECRET)

res.cookie("token",token)

res.status(201).json({
  message : "User loggedIn successfully",
  user:{
      id : user._id,
      role : user.role
  }
})
  
}

async function logOutUser(req,res){
  res.clearCookie("token")
  res.status(200).json({
    message : "User logged out successfully"
  })
}

module.exports = {registerUser, loginUser,logOutUser}