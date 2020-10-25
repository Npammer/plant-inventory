const Category = require("../models/category");
const Plant = require("../models/plant");
const {
  body,
  validationResult
} = require("express-validator");

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
  res.render("category_form", {
    title: "Create category",
  });
};

exports.category_create_post = [
  body("name", "Title must not be empty.")
  .trim()
  .isLength({
    min: 1,
  })
  .escape(),
  body("description").trim().escape(),
  body("url").trim().escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    let category = new Category({
      name: req.body.name,
      description: req.body.description,
      url: req.body.url,
    });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create category",
      });
    } else {
      // Data from form is valid. Save book.
      category.save(function (err) {
        if (err) {
          return next(err);
        }
        //successful - redirect to new book record.
        res.redirect(category.link);
      });
    }
  },
];

exports.category_delete_post = function (req, res, next) {

  async.parallel({
    category: function (callback) {
      Category.findById(req.params.id).exec(callback)
    },
    plants: function (callback) {
      Plant.find({
        'category': req.params.id
      }).exec(callback)
    },
  }, function (err, results) {
    if (err) {
      return next(err);
    }
    // Success
    if (results.plants.length > 0) {
      // book has books. Render in same way as for GET route.
      res.render("category_detail", {
        title: "Category Detail",
        category: results.category,
        plants: results.plants,
        delete: true,
      });
      return;
    } else {
      // book has no books. Delete object and redirect to the list of books.
      Category.findByIdAndRemove(req.params.id, function deleteCategory(err) {
        if (err) {
          return next(err);
        }
        // Success - go to book list
        res.redirect('/categories')
      })
    }
  });
};

exports.category_update_get = function (req, res) {
  Category.findById(req.params.id).exec(function (err, category) {
    if (err) {
      return next(err);
    }
    //Successful, so render
    res.render("category_form", {
      title: "Update category",
      category,
    });
  });
};

exports.category_update_post = [
  body("name", "Title must not be empty.")
  .trim()
  .isLength({
    min: 1,
  })
  .escape(),
  body("description").trim().escape(),
  body("url").trim().escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    let category = new Category({
      name: req.body.name,
      description: req.body.description,
      url: req.body.url,
      _id: req.params.id
    });

    if (!errors.isEmpty()) {
      Category.findById(req.params.id).exec(function (err, category) {
        if (err) {
          return next(err);
        }
        //Successful, so render
        res.render("category_form", {
          title: "Update category",
          category,
        });
      });
      return;
    } else {
      // Data from form is valid. Save book.
      Category.findByIdAndUpdate(req.params.id, category, {}, function (err, thecategory) {
        if (err) {
          return next(err);
        }
        //successful - redirect to new book record.
        res.redirect(thecategory.link);
      });
    }
  },
];

exports.category_detail = function (req, res, next) {
  async.parallel({
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