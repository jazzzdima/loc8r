var express = require('express');
const controllerMain = require('../controllers/main');
var router = express.Router();

/* GET home page. */
router.get('/', controllerMain.index);

module.exports = router;
