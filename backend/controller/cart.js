const Cart = require("../model/cart");
const user = require("../model/user");

const addProductToCart = async (req, res) => {
 
  try {
    //expecting userId and quantity of product selected by user
    let { userId, quantity, productId } = req.body;
    
    if (!userId || quantity < 0 || !productId) {
      return res.status(401).json({
        msg: "plz provide all information",
      });
    }

    if (quantity == 0) {
      quantity = 1;
    }

    //fetching cart info for the given userId
    const userCart = await Cart.findOne({ userId });

    if (!userCart) {
      return res.json({
        msg: "error occured while fetching cart of user",
      });
    }

    let shoudlInsertProduct = true;

    let productsInCart = userCart.products;
    for (let i = 0; i < productsInCart.length; i++) {
      if (productsInCart[i].productId == productId) {
        shoudlInsertProduct = false;
      }
    }

    if (shoudlInsertProduct) {
      userCart.products.push({
        productId,
        quantity,
      });
    }

    await userCart.save();
    
    return res.status(201).json({
      products: userCart.products,
      msg: "product added to cart successfully",
     
      
    });
  } catch (err) {
    return res.status(402).json({
      err: `unable to add product to cart`,
    });
  }
};

const removeProductFromCart = async (req, res) => {
  
  try {
    //expecting userId and quantity of product selected by user
    let requiredInput = req.query;
    let userId=Number(requiredInput.userId);
    
    let productId=Number(requiredInput.productId);

    
   
    if (!userId || !productId) {
      return res.status(401).json({
        err: "plz provide all information",
      });
    }

    //fetching cart info for the given userId
    const userCart = await Cart.findOne({userId });
    if (!userCart) {
      return res.status(401).json({
        err: "error occured while fetching cart of user",
      });
    }

    let targetIndexOfProduct=null;

    let cartProducts = userCart.products;

    for (let i = 0; i < cartProducts.length; i++) {
      if (cartProducts[i].productId == productId) {
        targetIndexOfProduct = i;
        break;
      }
    }

    cartProducts.splice(targetIndexOfProduct, 1);
    await userCart.save();

    return res.status(201).json({
      products: userCart.products,
      msg: "product removed from cart successfully",
     
    });
  } catch (err) {
    return res.status(402).json({
      err: `unable to remove product from cart`,
    });
  }
};

const getUserCart = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(401).json({
        err: "plz provide userId",
      });
    }

    const userId = Number(id);
    const userCart = await Cart.findOne({ userId });
    if (!userCart || userCart.products.length < 0) {
      return res.status(401).json({
        err: "cart not avalaible for specified userid",
      });
    }

    return res.status(201).json({
      products: userCart,
    });
  } catch (err) {
    return res.status(401).json({
      err: "Some error Occuured in getusercart",
    });
  }
};

const createCartForUser = async (req, res) => {
  try {
    const id = req.params.id;
    
    if (!id) {
      return res.status(401).json({
        msg: "plz provide userId",
      });
    }

    let userId = Number(id);

 
    
    let userCart = await Cart.findOne({ userId });
    if (!userCart) {
       await Cart.create({
        id: userId,
        userId,
        products: [],
      });

     

      return res.status(201).json({
        msg: "cart created successfully",
      });
    } else {
      return res.status(201).json({
        err: "cart is already created",
      });
    }
  } catch (err) {
    return res.status(401).json({
      err: `unable to create cart for user`,
    });
  }
};

const deleteUserCart = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(401).json({
        err: "plz provide userId",
      });
    }

    let userId = Number(id);

    let cart = await Cart.deleteOne({ userId });

    return res.status(201).json({
      msg: "cart deleted susscessfully",
    });
  } catch (err) {
    return res.status(401).json({
      err: `unable to delete cart due to ${err}`,
    });
  }
};

const deleteProductsOfCart=async(req,res)=>{
  try{
    const id = req.params.id;

    if (!id) {
      return res.status(401).json({
        err: "plz provide userId",
      });
    }

    let userId = Number(id);
    let userCart = await Cart.findOne({ userId });
    if (!userCart ) {
      return res.status(401).json({
        err: "unable to fetch cart details",
      });
    }

    if(userCart.products.length==0){
      return res.status(301).json({
        msg:'cart is already empty'
      })
    }

    //deleting all products of cart
    userCart.products=[];
    await userCart.save()

    return res.status(201).json({
      msg:'All products removed from cart successfully'
    })


  }catch(err){
    return res.status(401).json({
      err:`unable to delete Products of cart`
    })
  }
}

const updateQuantity=async(req,res)=>{
  try{
     const requiredInput=req.query;
     let userId=Number(requiredInput.userId);
    
     let productId=Number(requiredInput.productId);
     let quantity=Number(requiredInput.quantity);
   

     if(!quantity){
      return res.status(401).json({
        err:'provide quantity value'
      })
     }

     const userCart=await Cart.findOne({id:userId});
     if(!userCart){
      return res.status(402).json({
        err:'you have not created the cart yet'
      })
     }
     userCart.products.map((product)=>{
        if(product.productId==productId){
          product.quantity=quantity;
        }
     })

     userCart.save();

     return res.status(201).json({
      msg:'quantity of product updated successfully',
      products:userCart.products
     })

  }catch(err){
    return res.status(401).json({
      err:'unable to update quantity of user'
    })
  }
}


module.exports = {
  addProductToCart,
  removeProductFromCart,
  getUserCart,
  createCartForUser,
  deleteUserCart,
  deleteProductsOfCart,
  updateQuantity,
 
};
