exports.index = function (req, res) {
    res.render("index", {
        title: "Plants-inventory"
    });
};

exports.about_us = function (req, res) {
    res.render("about_us", {
        title: "About Us"
    });
};