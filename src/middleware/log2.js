const log2 = (req, res, next) => {
  console.log("Console 2");
  next()
};

module.exports = log2