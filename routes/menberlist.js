var express = require('express');
//ルーティングオブジェクトの生成
var router = express.Router();

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
router.get('/menberlist', function (req, res, next) {

    // SQL生成
    sql = "select officeid, menberid, name, DATE_FORMAT(hireday, '%Y/%m/%d') as hireday, DATE_FORMAT(retireday, '%Y/%m/%d') as retireday from menber order by officeid, menberid;";

    // menberlistの取得
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            console.log('err: ' + err);
        }
        // クライアントに送るJSONデータ
        res.render('menberlist', {
            title: '業務支援システム',
            data: rows
        });
    });
});

//ルーティングオブジェクトに対してPOSTリクエストを登録
router.post('/menberlist', function (req, res, next) {

    var officeid = 2;
    var loginid = 0;
    var password = 0;

    // 未入力の場合、無視
    if (req.body.loginid != undefined) {
        loginid = req.body.loginid;
    }
    if (req.body.password != undefined) {
        password = req.body.password;
    }

    // SQL生成
    var sql = "select count(*) as cnt from staff where officeid = ? and staffid = ? and password = ? ;";
    console.log('sql:' + sql);

    // staffcntの取得
    connection.query(sql, [officeid, loginid, password], function (err, rows, fields) {
        if (err) {
            console.log('err: ' + err);
        }

        var cnt = 0;
        // 取得できなかった場合、無視
        if (rows != undefined) {
            cnt = rows[0].cnt;
        }

        // 存在チェック
        if (cnt > 0) {
            // SQL生成
            sql = "select officeid, menberid, name, DATE_FORMAT(hireday, '%Y/%m/%d') as hireday, DATE_FORMAT(retireday, '%Y/%m/%d') as retireday from menber order by officeid, menberid;";

            // menberlistの取得
            connection.query(sql, function (err, rows, fields) {
                if (err) {
                    console.log('err: ' + err);
                }
                // クライアントに送るJSONデータ
                res.render('menberlist', {
                    title: '業務支援システム',
                    data: rows
                });
            });
        } else {
            // クライアントに送るJSONデータ
            res.render('login', {
                title: '業務支援システム',
                cnt: cnt
            });
        }
    });
});

//ルーティングオブジェクトに対してPOSTリクエストを登録
router.post('/menberdelete', function (req, res, next) {

    var officeid = req.body.officeid;
    var menberid = req.body.menberid;

    // SQL生成
    var sql = "delete from menber where officeid = ? and menberid = ? ;";
    console.log('sql:' + sql);

    // staffcntの取得
    connection.query(sql, [officeid, menberid], function (err, rows, fields) {
        if (err) {
            console.log('err: ' + err);
        }

        // SQL生成
        sql = "select officeid, menberid, name, DATE_FORMAT(hireday, '%Y/%m/%d') as hireday, DATE_FORMAT(retireday, '%Y/%m/%d') as retireday from menber order by officeid, menberid;";

        // menberlistの取得
        connection.query(sql, function (err, rows, fields) {
            if (err) {
                console.log('err: ' + err);
            }
            // クライアントに送るJSONデータ
            res.render('menberlist', {
                title: '業務支援システム',
                data: rows
            });
        });
    });
});

//これでapp.js側でこのファイルを扱うことができる
module.exports = router;
