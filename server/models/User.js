const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//TODO: why unique email is not working?
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  confirmation_token: String,
  // confirmation_token_expires_at: Date,
  isConfirmed: { type: Boolean, default: false },
  age: { type: Number, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  gender: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password") || this.isNew) {
      // Password strength validation
      const passwordRegEx =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
      if (!passwordRegEx.test(this.password)) {
        return next(
          new Error(
            "Password must have at least 8 characters, one number, one lower and one upper case letter, and one special character"
          )
        );
      }
      //Hashing password
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (plaintext) {
  try {
    return await bcrypt.compare(plaintext, this.password);
  } catch (error) {
    throw new Error("Comparing password failed");
  }
};

module.exports = mongoose.model("User", UserSchema);
