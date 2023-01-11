import { Container } from "inversify";
import { GetCartUseCase } from "../aplication/cart/get-cart.use-case";
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