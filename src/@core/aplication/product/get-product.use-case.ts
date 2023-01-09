import { Product } from "../../domain/entities/product";
import { ProductGateway } from "../../domain/gateways/product.gateway";

export class GetProductUseCase {
    constructor(private productGateway: ProductGateway) {}
 
    execute(id: number): Promise<Product> {
        return this.productGateway.findById(id)
    }
}