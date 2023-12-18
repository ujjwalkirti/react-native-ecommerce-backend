const productRouter = require("express").Router();
const productController = require("../controllers/productsControllers");

productRouter.get("/", productController.getAllProducts);

productRouter.get("/:id", productController.getProductById);

productRouter.get("/search/:key", productController.searchProduct);

productRouter.post("/", productController.createProduct);

export default productRouter;
