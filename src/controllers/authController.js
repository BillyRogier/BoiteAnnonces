const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/key");

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: "Cet email est déjà utilisé" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ firstName, lastName, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Utilisateur non trouvé" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.json({ message: "Connexion réussie", token });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Déconnexion réussie" });
};

const githubAuth = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) return res.status(400).send("No code provided");

    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: config.github.clientId,
        client_secret: config.github.clientSecret,
        code,
      },
      { headers: { Accept: "application/json" } }
    );

    const accessToken = tokenResponse.data.access_token;
    const userData = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `token ${accessToken}` },
    });

    let user = await User.findOne({ username: userData.data.login });
    if (!user) {
      user = new User({
        username: userData.data.login,
        name: userData.data.name,
      });
      await user.save();
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("GitHub authentication failed");
  }
};

const googleAuth = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) return res.status(400).send("No code provided");

    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        client_id: config.google.clientId,
        client_secret: config.google.clientSecret,
        redirect_uri: config.google.redirectUri,
        grant_type: "authorization_code",
        code,
      }
    );

    const accessToken = tokenResponse.data.access_token;
    const userData = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    let user = await User.findOne({ email: userData.data.email });
    if (!user) {
      user = new User({
        username: userData.data.email,
        name: userData.data.name,
      });
      await user.save();
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Google authentication failed");
  }
};

module.exports = { register, login, logout, githubAuth, googleAuth };
