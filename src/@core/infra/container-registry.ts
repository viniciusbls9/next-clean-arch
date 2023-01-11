import { Container } from "inversify";
import { AddProductInCartUseCase } from "../aplication/cart/add-product-in-cart.use-case";
import { ClearCartUseCase } from "../aplication/cart/clear-cart.use-case";
import { GetCartUseCase } from "../aplication/cart/get-cart.use-case";
import { RemoveProductFromCartUseCase } from "../aplication/cart/remove-product-from-cart.use-case";
import { GetProductUseCase } from "../aplication/product/get-product.use-case";
import { ListProductsUseCase } from "../aplication/product/list-product.use-case";
import { CartLocalStorageGateway } from "./gateways/cart-local-storage.gateway";
import { ProductHttpGateway } from "./gateways/product-http.gateway";
import { http } from "./http";

export const Registry = {
    AxiosAdapter: Symbol.for('AxiosAdapter'),

    ProductGateway: Symbol.for('ProductGateway'),
    CartGateway: Symbol.for('CartGateway'),

    ListProductsUseCase: Symbol.for('ListProductsUseCase'),
    GetProductUseCase: Symbol.for('GetProductUseCase'),

    GetCartUseCase: Symbol.for('GetCartUseCase'),
    AddProductInCartUseCase: Symbol.for('AddProductInCartUseCase'),
    RemoveProductFromCartUseCase: Symbol.for('RemoveProductFromCartUseCase'),
    ClearCartUseCase: Symbol.for('ClearCartUseCase'),
}

export const container = new Container()

container.bind(Registry.AxiosAdapter).toConstantValue(http)

container.bind(Registry.ProductGateway).toDynamicValue((context) => {
    return new ProductHttpGateway(context.container.get(Registry.AxiosAdapter))
})

container.bind(Registry.CartGateway).to(CartLocalStorageGateway)

container.bind(Registry.ListProductsUseCase).toDynamicValue((context) => {
    return new ListProductsUseCase(context.container.get(Registry.ProductGateway))
})

container.bind(Registry.GetProductUseCase).toDynamicValue((context) => {
    return new GetProductUseCase(context.container.get(Registry.ProductGateway))
})

container.bind(Registry.GetCartUseCase).toDynamicValue((context) => {
    return new GetCartUseCase(context.container.get(Registry.CartGateway))
})

container.bind(Registry.AddProductInCartUseCase).toDynamicValue((context) => {
    return new AddProductInCartUseCase(context.container.get(Registry.CartGateway))
})

container.bind(Registry.RemoveProductFromCartUseCase).toDynamicValue((context) => {
    return new RemoveProductFromCartUseCase(context.container.get(Registry.CartGateway))
})

container.bind(Registry.ClearCartUseCase).toDynamicValue((context) => {
    return new ClearCartUseCase(context.container.get(Registry.CartGateway))
})