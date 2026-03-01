import { validateProfileEditData } from "../utils/validation.js";

// View Profile
export const viewProfile = async (req, res) => {
  try {
    const { firstName, lastName, photoUrl, skills, gender, age } = req.user;

    res.json({
      firstName,
      lastName,
      photoUrl,
      skills,
      gender,
      age,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Edit Profile
export const editProfile = async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};
