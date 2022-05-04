const fs = require('fs');
const path = require('path');

const upload = require('../config/upload');

const tokensRoutes = (app) => {
  // VARIABLES
  const dbFile = path.resolve(__dirname, 'db.json');
  const db = fs.readFileSync(dbFile, 'utf8');
  const tokens = JSON.parse(db);

  // INDEX
  app.get('/tokens/:tokenID', (req, res) => {
    const { tokenID } = req.params;

    res.status(200).json(tokens[tokenID]);
  });

  // CREATE
  app.post('/tokens', upload.single('img'), (req, res) => {
    const { filename } = req.file;
    const { tokenId, name, description, price } = req.body;

    tokens[tokenId] = {
      name,
      description,
      price,
      image: req.protocol + '://' + req.get('host') + "/images/" + filename
    };

    fs.writeFileSync(dbFile, JSON.stringify(tokens));

    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl + '/' + tokenId;

    res.status(201).json({ message: fullUrl });
  });
};

module.exports = tokensRoutes;

