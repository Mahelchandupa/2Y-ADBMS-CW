const router = require("express").Router();
const Product = require("../models/ProductCatalog")

//ADD PRODUCT
router.post("/add", async (req,res) =>{
    try{
      const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category
      })
      const product = await newProduct.save();
      res.status(200).json(product)

    }catch(err){
        res.status(500).json(err)
    }
})

//ADD MANY PRODUCT
router.post("/addMany", async (req, res) => {
  try {
    const productsData = req.body; 

    // Insert multiple customers to the database
    const products = await Product.insertMany(productsData);

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});


//UPDATE PRODUCT
router.put("/:id", async (req, res) =>{
    if(req.body.productId === req.params.id){
        try{
          const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
          },
          {new: true});
          res.status(200).json(updateProduct);
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(401).json("Product Id cannot found")
    }
})

//DELETE PRODUCT 
router.delete("/:id", async (req,res) =>{
    if(req.body.productId === req.params.id){
        try{
          const product = await Product.findByIdAndDelete(req.params.id);
          res.status(200).json("Product has been Deleted")

        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(401).json("Product Id Not found")
    }
})

//GET ALL PRODUCT
router.get("/", async (req,res) =>{
    const cat = req.query.category
    try{
      let products;
      if(cat){
        products = await Product.find({ category: cat });
      }
      else{
        products = await Product.find();
      }
      res.status(200).json(products)

    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router