import FormEntry from "../models/FormEntry";


// @desc Create new form entry
// @route POST /form
// @access Private
const createNewFormEntry = async (req, res) => {
  const { businessName, contactName, email, phone } = req.body

  // Confirm data
  if (!businessName || !contactName || !email) {
      return res.status(400).json({ message: 'All fields are required' })
  }

  // Check for duplicate RegisterUser
  const duplicate = await FormEntry.findOne({ email }).collation({ locale: 'en', strength: 2}).lean().exec()

  if (duplicate) {
      return res.status(409).json({ message: 'Duplicate email' })
  }

  // Create and store new user 
  const formEntry = await FormEntry.create()

  if (formEntry) { //created 
      res.status(201).json({ message: `New form entry ${contactName} created` })
  } else {
      res.status(400).json({ message: 'Invalid form entry data received' })
  }
}

module.exports = {
  createNewFormEntry
}