const Ad = require("../models/Ad");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage }).single("image");

const createAd = async (req, res) => {
  upload(req, res, async (err) => {
    if (err)
      return res
        .status(400)
        .json({ message: "Erreur lors du téléchargement de l'image" });

    const { title, description } = req.body;
    if (!title || !description || !req.file)
      return res.status(400).json({ message: "Tous les champs sont requis" });

    try {
      const ad = new Ad({
        title,
        description,
        image: `/uploads/${req.file.filename}`,
        user: req.user.id,
      });

      await ad.save();
      res.status(201).json(ad);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
};

const getAds = async (req, res) => {
  try {
    const ads = await Ad.find().populate("user", "firstName lastName email");
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate(
      "user",
      "firstName lastName email"
    );
    if (!ad) return res.status(404).json({ message: "Annonce non trouvée" });

    res.json(ad);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const updateAd = async (req, res) => {
  try {
    let ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Annonce non trouvée" });

    if (ad.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Accès interdit" });

    ad.title = req.body.title || ad.title;
    ad.description = req.body.description || ad.description;
    if (req.file) ad.image = `/uploads/${req.file.filename}`;

    await ad.save();
    res.json(ad);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Annonce non trouvée" });

    if (ad.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Accès interdit" });

    await ad.deleteOne();
    res.json({ message: "Annonce supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = { createAd, getAds, getAdById, updateAd, deleteAd };
