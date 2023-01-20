// importing the mongoose module and create a schema
const Product = require('../models/productModel');

// function to get all products
const get_all_products = (req, res) => {
    Product.find({}, (err, products) => {
        if(err){
            res.send({message: 'Error in getting products'});
        }
        else{
            res.send({products: products, message: 'Products are fetched successfully'});
        }
    });
}

// function to get a product by id
const get_product_by_id = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if(err){
            res.send({message: 'Error in getting product'});
        }
        else{
            res.send({product: product, message: 'Product is fetched successfully'});
        }
    });
}

module.exports = {
    get_all_products,
    get_product_by_id
}