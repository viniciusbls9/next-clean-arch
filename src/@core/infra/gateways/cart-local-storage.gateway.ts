import { injectable } from "inversify";
import { Cart } from "../../domain/entities/cart";
import { Product } from "../../domain/entities/product";
import { CartGateway } from "../../domain/gateways/cart.gateway";

@injectable()
export class CartLocalStorageGateway implements CartGateway {
    private readonly CART_KEY = 'cart'

    get(): Cart {
        const products = JSON.parse(localStorage.getItem(this.CART_KEY) || '[]')
       return new Cart({ products: products.map((product: Product) => new Product({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
       })) })
    }
    save(cart: Cart): void {
        localStorage.setItem(this.CART_KEY, JSON.stringify(cart.products))
    }

}