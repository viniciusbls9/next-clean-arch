import { injectable } from "inversify";
import { Cart } from "../../domain/entities/cart";
import { CartGateway } from "../../domain/gateways/cart.gateway";

@injectable()
export class CartLocalStorageGateway implements CartGateway {
    private readonly CART_KEY = 'cart'

    get(): Cart {
        const products = JSON.parse(localStorage.getItem(this.CART_KEY) || '[]')
       return new Cart({ products: products })
    }
    save(cart: Cart): void {
        localStorage.setItem(this.CART_KEY, JSON.stringify(cart.products))
    }

}