const Product = require("../model/product");

module.exports.getAllProducts = (req, res) => {
  const limit = Number(req.query.limit) || 0;
  const sort = req.query.sort == "desc" ? -1 : 1;

  Product.find({})

    .limit(limit)
    .sort({ id: sort })
    .then((products) => {
      res.status(201).json(products);
    })
    .catch((err) => res.status(402).json({
      err:'unable to fetch all products'
    }))
};

module.exports.getProduct = async (req, res) => {
  try {
    let { id } = req.params;

    if (!id) {
      return res.status(401).json({
        msg: "pls provide productid",
      });
    }

    let product = await Product.findOne({ id });
    if (!product) {
      return res.status(401).json({
        msg: "unable to fetch details of product",
      });
    }

    return res.status(201).json({
      product,
    });
  } catch (err) {
    return res.status(401).json({
      err,
    });
  }
};

module.exports.getProductCategories = (req, res) => {
  Product.distinct("category")
    .then((categories) => {
      res.status(201).json(categories);
    })
    .catch((err) => res.status(402).json({
      err:'error while fetching product categories',
    }));
};

module.exports.filterProduct = async (req, res) => {
  try {
   
    let { min, max, q } = req.query;
   
    if (!min && !max && !q) {
      return res.status(401).json({
        err: "plz provide atleast one paramter for filtering",
      });
    }

    if (!min && !max) {
      min = 0;
      max = 1000;
    }

    if (!min) {
      min = 0;
    }
    if (!max || max==0) {
      max = 1000;
    }
    if (!q) {
      q = "";
    }

    let searchedProducts = await Product.find({
      $and: [{ price: { $gte: Number(min)} }, { price: { $lte: Number(max) } }],
      title: { $regex: `(?i)${q}(?-i)` },
    });
    if (!searchedProducts) {
      return res.status(401).json({
        err: "unable to search product",
      });
    }
   

    return res.status(201).json({
      products: searchedProducts,
    });
  } catch (err) {
    return res.status(401).json({
      err:'unable to fileter product'
    });
  }
};
module.exports.getProductsInCategory = (req, res) => {
  const category = req.params.category;
  const limit = Number(req.query.limit) || 0;
  const sort = req.query.sort == "desc" ? -1 : 1;

  Product.find({
    category,
  })
    .select(["-_id"])
    .limit(limit)
    .sort({ id: sort })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => res.status(402).json({
      err:'unable to fetch products with specific categories'
    }));
};

module.exports.getDiscountAndDeliveryCharge=(req,res)=>{
  try{

    return res.status(201).json({
      deliveryCharge:30,
      discount:100,
    })
    
  }catch(err){
    return res.status(402).json({
      msg:'unable to calculate Price'
    })
  }
}
