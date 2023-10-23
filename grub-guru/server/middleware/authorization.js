const hasAuthorization = (req, res, next) => {
  const authorized = req.userId.toString() === req.body.userId;
  if (!authorized) {
    return res
      .status(403)
      .json({ error: "User is not authorized to update this profile" });
  }
  next();
};

module.exports = hasAuthorization;
