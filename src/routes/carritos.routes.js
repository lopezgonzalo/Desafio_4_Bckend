import { Router } from "express";
import { CartManager } from "../controllers/CartManager.js";
import { ProductManager } from "../controllers/ProductManager.js";

const routerCart = Router()
const cartManager = new CartManager('src/models/carritos.json')
const prodManager = new ProductManager('src/models/productos.json')


routerCart.get('/:cid', async (req, res) => { 
    const cart = await cartManager.getCartById(parseInt(req.params.cid))
    res.send(cart)
})

routerCart.post('/', async (req, res) => { 
    const carrito = await cartManager.addCart()
    res.send(carrito)
})

routerCart.post('/:cid/product/:pid', async (req, res) => { 
    const prodQty = 1;
    const productData = await prodManager.getProductById(parseInt(req.params.pid));
    if (productData) {
        const data = await cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid), prodQty)
        data ? res.send(`Producto ${productData.id} agregado al carrito.`) : res.send(`Hubo un error al agregar el producto al carrito.`)
    } else {
        res.send(`El producto ${req.params.pid} no se ha encontrado.`)
    }
    
})

routerCart.delete('/:cid', async (req, res) => {
    let mensaje = await cartManager.deleteCart(req.params.cid) 
    res.send(mensaje)
})

routerCart.delete('/:cid/product/:pid', async (req, res) => { 
    const cartData = await cartManager.getCartById(parseInt(req.params.cid));
    if (cartData) {
        const data = await cartManager.deleteProductFromCart(parseInt(req.params.cid), parseInt(req.params.pid))
        data ? res.send(`Producto ${req.params.pid} eliminado del carrito.`) : res.send(`Hubo un error al eliminar el producto del carrito.`)
    } else {
        res.send(`El producto ${req.params.pid} no se ha encontrado.`)
    }
    
})


export default routerCart