let message = "Welcome to the API!";

exports.getApiHome = (req, res) => {
  res.send({ message: message });
};
