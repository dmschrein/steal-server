import FormEntry from "../models/FormEntry.js";

// @desc Create new form entry
// @route POST /form
// @access Private
export const createNewFormEntry = async (req, res) => {
  const { businessName, contactName, email, phone, website, industry, prodCategories, keyProducts, platformsUsed, avgMonthlySales, competitiveEdge, challengesFaced, interest, expectedBenefits, additionalInfo } = req.body;

  // Confirm data
  if (!businessName || !contactName || !email) {
      return res.status(400).json({ message: 'All fields are required' });
  }

  // Check for duplicate email
  const duplicate = await FormEntry.findOne({ email }).collation({ locale: 'en', strength: 2 }).lean().exec();

  if (duplicate) {
      return res.status(409).json({ message: 'Duplicate email' });
  }

  // Create and store new form entry
  try {
    const formEntry = await FormEntry.create({
      businessName,
      contactName,
      email,
      phone, 
      website,
      industry,
      prodCategories,
      keyProducts,
      platformsUsed,
      avgMonthlySales,
      competitiveEdge,
      challengesFaced,
      interest,
      expectedBenefits,
      additionalInfo
    });
    res.status(201).json({ message: `New form entry for ${contactName} created.` });
  } catch (error) {
    res.status(400).json({ message: 'Invalid form entry data received', error: error.toString() });
  }
};
