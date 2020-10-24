var express = require('express');
var router = express.Router();

// Controllers
const plant_controller = require('../controllers/plantController');
const category_controller = require('../controllers/categoryController');

// INDEX ROUTE
router.get('/', plant_controller.index);

// PLANT ROUTES

router.get('/plants', plant_controller.plant_list);

router.get('/plant/create', plant_controller.plant_create_get);

router.post('/plant/create', plant_controller.plant_create_post);

router.get('/plant/:id/delete', plant_controller.plant_delete_post);

router.get('/plant/:id/update', plant_controller.plant_update_get);

router.post('/plant/:id/update', plant_controller.plant_update_post);

router.get('/plant/:id', plant_controller.plant_detail);

// CATALOG ROUTES

router.get('/categories', category_controller.category_list);

router.get('/category/create', category_controller.category_create_get);

router.post('/category/create', category_controller.category_create_post);

router.post('/category/:id/delete', category_controller.category_delete_post);

router.get('/category/:id/update', category_controller.category_update_get);

router.post('/category/:id/update', category_controller.category_update_post);

router.get('/category/:id', category_controller.category_detail);

module.exports = router;