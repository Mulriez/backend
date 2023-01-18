const log = (req, res, next) => {
  console.log("Console 1");
  next()
};

module.exports = log