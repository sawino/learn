/**
 * Created by yangsaw on 7/31/2014.
 */
var express = require('express');
var router = express.Router();
var Bear = require('../models/bear');

router.get('/', function(req, res) {
    res.send('root of api');
});

router.route('/bears')
    .post(function(req, res) {
        var bear = new Bear();
        bear.name = req.body.name;
        bear.age = 15;

        bear.save(function(err) {
            if (err) {
                return res.send(err);
            }
            else
            {
                return res.json({message: "created"});
            }
        })
    })

    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err) {
                res.send(err);
            }

            res.json(bears);
        })
    });

router.route('/bears/:bear_id')

    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);

            res.json(bear);
        });
    })

    .put(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err) {
                res.send(err);
            }

            bear.name = req.body.name;
            bear.save(function(err) {
                if (err) {
                    res.send(err);
                }

                res.json({message: 'updated'});
            });
        });
    })

    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err) {
                res.send(err);
            }

            res.json({message: 'deleted'});
        });
    })

;

module.exports = router;