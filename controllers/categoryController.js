const Category = require("../models/category");
const Plant = require("../models/plant");

var async = require("async");

exports.category_list = function (req, res) {
  Category.find({}).exec(function (err, list_categories) {
    if (err) {
      return next(err);
    }
    //Successful, so render
    res.render("category_list", {
      title: "Category List",
      category_list: list_categories,
    });
  });
};

exports.category_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Category create get");
};

exports.category_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Category create post");
};

exports.category_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Category delete get");
};

exports.category_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Category delete post");
};

exports.category_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Category update get");
};

exports.category_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Category update post");
};

exports.category_detail = function (req, res, next) {
  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.params.id).exec(callback);
      },

      plants: function (callback) {
        Plant.find({
          category: req.params.id,
        }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.category == null) {
        // No results.
        var err = new Error("category not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("category_detail", {
        title: "Category Detail",
        category: results.category,
        plants: results.plants,
      });
    }
  );
};
