// Models
const Plant = require("../models/plant");
const Category = require("../models/category");

// Validation
const {
    body,
    validationResult
} = require("express-validator");

// Async
var async = require("async");


exports.plant_list = function (req, res, next) {
    Plant.find({})
        .populate("category")
        .exec(function (err, list_plants) {
            if (err) {
                return next(err);
            }
            //Successful, so render
            res.render("plant_list", {
                title: "Plant List",
                plant_list: list_plants,
            });
        });
};

exports.plant_create_get = function (req, res, next) {
    Category.find({}).exec(function (err, list_categories) {
        if (err) {
            return next(err);
        }
        //Successful, so render
        res.render("plant_form", {
            title: "Create Plant",
            categories: list_categories,
        });
    });
};

exports.plant_create_post = [
    body("name").trim().isLength({
        min: 1
    }).escape(),
    body("description").trim().escape(),
    body("category").trim().escape(),
    body("price").isNumeric().isLength({
        min: 1
    }).escape(),
    body("in_stock").isNumeric().escape(),
    body("url").isURL().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped and trimmed data.
        var plant = new Plant({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            in_stock: req.body.in_stock,
            url: req.body.url,
        });

        if (!errors.isEmpty()) {
            Category.find({}).exec(function (err, list_categories) {
                if (err) {
                    return next(err);
                }
                //Successful, so render
                res.render("plant_form", {
                    title: "Create Plant",
                    categories: list_categories,
                });
            });
            return;
        } else {
            // Data from form is valid. Save book.
            plant.save(function (err) {
                if (err) {
                    return next(err);
                }
                //successful - redirect to new plant record.
                res.redirect(plant.link);
            });
        }
    }

];

exports.plant_delete_post = function (req, res, next) {
    Plant.findByIdAndRemove(req.params.id, function deletePlant(err) {
        if (err) {
            return next(err);
        }
        // Success - go to book list
        res.redirect('/plants')
    })
};

exports.plant_update_get = function (req, res, next) {

    async.parallel({
        plant: function (callback) {
            Plant.findById(req.params.id).populate('category').exec(callback);
        },
        categories: function (callback) {
            Category.find(callback);
        },
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        if (results.plant == null) { // No results.
            var err = new Error('Plant not found');
            err.status = 404;
            return next(err);
        }

        for (let all_c_iter = 0; all_c_iter < results.categories.length; all_c_iter++) {
            for (let plant_c_iter = 0; plant_c_iter < results.plant.category.length; plant_c_iter++) {
                if (results.categories[all_c_iter]._id.toString() == results.plant.category[plant_c_iter]._id.toString()) {
                    results.categories[all_c_iter].checked = 'true';
                }
            }
        }
        res.render("plant_form", {
            title: "Update Plant",
            plant: results.plant,
            categories: results.categories,
        })
    })
}

exports.plant_update_post = [
    body("name").trim().isLength({
        min: 1
    }).escape(),
    body("description").trim().escape(),
    body("category").trim().escape(),
    body("price").isNumeric().isLength({
        min: 1
    }).escape(),
    body("in_stock").isNumeric().escape(),
    body("url").isURL().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped and trimmed data.
        var plant = new Plant({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            in_stock: req.body.in_stock,
            url: req.body.url,
            _id: req.params.id
        });

        if (!errors.isEmpty()) {
            async.parallel({
                plant: function (callback) {
                    Plant.findById(req.params.id).populate('category').exec(callback);
                },
                categories: function (callback) {
                    Category.find(callback);
                },
            }, function (err, results) {
                if (err) {
                    return next(err);
                }
                if (results.plant == null) { // No results.
                    var err = new Error('Plant not found');
                    err.status = 404;
                    return next(err);
                }

                for (let all_c_iter = 0; all_c_iter < results.categories.length; all_c_iter++) {
                    for (let plant_c_iter = 0; plant_c_iter < results.plant.category.length; plant_c_iter++) {
                        if (results.categories[all_c_iter]._id.toString() == results.plant.category[plant_c_iter]._id.toString()) {
                            results.categories[all_c_iter].checked = 'true';
                        }
                    }
                }
                res.render("plant_form", {
                    title: "Update Plant",
                    plant: results.plant,
                    categories: results.categories,
                })
            })
            return;
        } else {
            // Data from form is valid. Save book.
            Plant.findByIdAndUpdate(req.params.id, plant, {}, function (err, theplant) {
                if (err) {
                    return next(err);
                }
                // Successful - redirect to book detail page.
                res.redirect(theplant.link);
            });
        }
    }

];

exports.plant_detail = function (req, res, next) {
    Plant.findById(req.params.id)
        .populate("category")
        .exec(function (err, plant) {
            if (err) {
                return next(err);
            }
            if (!plant) { // No results.
                var err = new Error('Plant not found');
                err.status = 404;
                return next(err);
            }
            //Successful, so render
            res.render("plant_detail", {
                title: "Plant details",
                plant,
                gsapLoaded: true,
            });
        });
};