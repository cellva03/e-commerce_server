const router = require('express').Router();
const { get_all_products,get_product_by_id} = require('../controllers/productController');

// Get all products
router.get('/', get_all_products)

// Get a product by id

router.get('/:id', get_product_by_id)

// exporting the router
module.exports = router;