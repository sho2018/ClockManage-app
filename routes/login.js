var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function (req, res, next) {
    res.render('login', {
        title: '業務支援システム',
        cnt: 1
    });
});

module.exports = router;
