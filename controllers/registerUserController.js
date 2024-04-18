import registerUser from "../models/registerUser"
import RegisterUser from "../models/registerUser"

const bcrypt = require('bcrypt')



// @desc Get all registered users
// @route GET /registerUsers
// @access Private
const getAllRegisterUser = async (req, res) => {
  // Get all users from MongoDB
  const regUsers = await RegisterUser.find().lean()

  // If no registered users 
  if (!regUsers?.length) {
      return res.status(400).json({ message: 'No registered users found' })
  }

  res.json(regUsers)
}

// @desc Create new RegisterUser
// @route POST /registerUser
// @access Private
const createNewRegisterUser = async (req, res) => {
  const { businessName, contactName, email, phone } = req.body

  // Confirm data
  if (!businessName || !contactName || !email) {
      return res.status(400).json({ message: 'All fields are required' })
  }

  // Check for duplicate RegisterUser
  const duplicate = await RegisterUser.findOne({ email }).collation({ locale: 'en', strength: 2}).lean().exec()

  if (duplicate) {
      return res.status(409).json({ message: 'Duplicate email' })
  }

  // Create and store new user 
  const regUser = await RegisterUser.create()

  if (regUser) { //created 
      res.status(201).json({ message: `New user ${contactName} created` })
  } else {
      res.status(400).json({ message: 'Invalid user data received' })
  }
}

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = async (req, res) => {
  const { id, username, roles, active, password } = req.body

  // Confirm data 
  if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
      return res.status(400).json({ message: 'All fields except password are required' })
  }

  // Does the user exist to update?
  const user = await registerUser.findById(id).exec()

  if (!user) {
      return res.status(400).json({ message: 'User not found' })
  }

  // Check for duplicate 
  const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2}).lean().exec()

  // Allow updates to the original user 
  if (duplicate && duplicate?._id.toString() !== id) {
      return res.status(409).json({ message: 'Duplicate username' })
  }

  user.username = username
  user.roles = roles
  user.active = active

  if (password) {
      // Hash password 
      user.password = await bcrypt.hash(password, 10) // salt rounds 
  }

  const updatedUser = await user.save()

  res.json({ message: `${updatedUser.username} updated` })
}

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = async (req, res) => {
  const { id } = req.body

  // Confirm data
  if (!id) {
      return res.status(400).json({ message: 'User ID Required' })
  }

  // Does the user still have assigned notes?
  const note = await Note.findOne({ user: id }).lean().exec()
  if (note) {
      return res.status(400).json({ message: 'User has assigned notes' })
  }

  // Does the user exist to delete?
  const user = await RegisterUser.findById(id).exec()

  if (!user) {
      return res.status(400).json({ message: 'User not found' })
  }

  const result = await user.deleteOne()

  const reply = `Username ${result.username} with ID ${result._id} deleted`

  res.json(reply)
}

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser
}