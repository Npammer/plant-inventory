const Plant = require('../models/plant');

exports.index = function (req, res) {
    res.send('NOT IMPLEMENTED: Index page');
};

exports.plant_list = function (req, res, next) {
    Plant.find({})
        .populate('category')
        .exec(function (err, list_plants) {
            if (err) {
                return next(err);
            }
            //Successful, so render
            res.render('plant_list', {
                title: 'Plant List',
                plant_list: list_plants
            });
        });
};

exports.plant_create_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Plant create get');
};

exports.plant_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Plant create post');
};

exports.plant_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Plant delete get');
};

exports.plant_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Plant delete post');
};

exports.plant_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Plant update get');
};

exports.plant_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Plant update post');
};

exports.plant_detail = function (req, res, next) {
    Plant.findById(req.params.id)
        .populate('category')
        .exec(function (err, plant) {
            if (err) {
                return next(err);
            }
            //Successful, so render
            res.render('plant_detail', {
                title: 'Plant details',
                plant
            });
        });
};