var express = require('express');
var router = express.Router();
var langs = require('../models/langs');
/* GET home page. */
router.get('/', function(req, res, next) {
    langs.load();
    console.log(langs.translatedPercentual("ptBR"));
    console.log(langs.notTranslated);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(langs.load()));
});

module.exports = router;
