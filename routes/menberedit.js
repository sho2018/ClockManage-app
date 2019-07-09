var express = require('express');
//ルーティングオブジェクトの生成
var router = express.Router();

var util = require('util');

var mysql = require('mysql');

// MySQLとのコネクションの作成
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'clock_manage'
});

//ルーティングオブジェクトに対してPOSTリクエストを登録
router.get('/menberedit', function (req, res, next) {

    var officeid = 2;
    var menberid = 0;
    var name = 0;
    var hireday = 0;
    var retireday = 0;

    // 事業所ID
    if (req.body.officeid != undefined) {
        officeid = req.body.officeid;
    }
    // メンバーID
    if (req.body.menberid != undefined) {
        menberid = req.body.menberid;
    }
    // 名前
    if (req.body.name != undefined) {
        name = req.body.name;
    }
    // 入所日
    if (req.body.hireday != undefined) {
        hireday = req.body.hireday;
    }
    // 退所日
    if (req.body.retireday != undefined) {
        retireday = req.body.retireday;
    }

    // クライアントに送るJSONデータ
    res.render('menberedit', {
        title: '業務支援システム',
        officeid: officeid,
        menberid: menberid,
        name: name,
        hireday: hireday,
        retireday: retireday
    });
});

//ルーティングオブジェクトに対してPOSTリクエストを登録
router.post('/menberedit', function (req, res, next) {

    var officeid = 2;
    var menberid = 0;
    var name = 0;
    var hireday = 0;
    var retireday = 0;

    // 事業所ID
    if (req.body.officeid != undefined) {
        officeid = req.body.officeid;
    }
    // メンバーID
    if (req.body.menberid != undefined) {
        menberid = req.body.menberid;
    }
    // 名前
    if (req.body.name != undefined) {
        name = req.body.name;
    }
    // 入所日
    if (req.body.hireday != undefined) {
        hireday = req.body.hireday;
    }
    // 退所日
    if (req.body.retireday != undefined) {
        retireday = req.body.retireday;
    }

    // クライアントに送るJSONデータ
    res.render('menberedit', {
        title: '業務支援システム',
        officeid: officeid,
        menberid: menberid,
        name: name,
        hireday: hireday,
        retireday: retireday
    });
});

//ルーティングオブジェクトに対してPOSTリクエストを登録
router.post('/menberins', function (req, res, next) {

    var retireday = null;

    var officeid = req.body.officeid;
    var menberid = req.body.menberid;
    var name = req.body.name;
    var hireday = req.body.hireday;

    // 退所日チェック
    if (req.body.retireday != undefined &&
        req.body.retireday != null &&
        req.body.retireday != "") {
        retireday = req.body.retireday;
    }

    // SQL生成
    var sql = "select count(*) as cnt from menber where officeid = ? and menberid = ? ;";

    // menberlistの取得
    connection.query(sql, [officeid, menberid], function (err, rows, fields) {

        if (rows[0].cnt <= 0) {
            // SQL生成
            sql = "insert into menber ( officeid, menberid, name, hireday, retireday ) values ( ?, ?, ?, cast( ? as date )";
            if (retireday == null) {
                sql = sql + ", ?";
            } else {
                sql = sql + ", cast( ? as date )";
            }
            sql = sql + " ) ;";
            console.log('sql: ' + sql);

            // menber登録
            connection.query(sql, [officeid, menberid, name, hireday, retireday], function (err, rows, fields) {
                if (err) {
                    console.log('err: ' + err);
                } else {
                    console.log('success');
                }
                // クライアントに送るJSONデータ
                res.render('menberedit', {
                    title: '業務支援システム',
                    officeid: officeid,
                    menberid: menberid,
                    name: name,
                    hireday: hireday,
                    retireday: retireday
                });
            });
        } else {
            // SQL生成
            sql = "update menber set name = ?, hireday = cast( ? as date )";
            if (retireday == null) {
                sql = sql + " , retireday = ?";
            } else {
                sql = sql + " , retireday = cast( ? as date )";
            }
            sql = sql + " where officeid = ? and menberid = ?;";
            console.log('sql: ' + sql);

            // menber更新
            connection.query(sql, [name, hireday, retireday, officeid, menberid], function (err, rows, fields) {
                if (err) {
                    console.log('err: ' + err);
                } else {
                    console.log('success');
                }
                // クライアントに送るJSONデータ
                res.render('menberedit', {
                    title: '業務支援システム',
                    officeid: officeid,
                    menberid: menberid,
                    name: name,
                    hireday: hireday,
                    retireday: retireday
                });
            });
        }
    });
});

//これでapp.js側でこのファイルを扱うことができる
module.exports = router;
