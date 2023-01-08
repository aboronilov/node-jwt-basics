const {BadRequest} = require("../errors");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequest("No username or password is privided");
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  const {username} = req.user;
  res.status(200).json({
    msg: `Hello ${username}`,
    secret: `Your authorized data (lucky number): ${luckyNumber}`,
  });

};

module.exports = { login, dashboard };
