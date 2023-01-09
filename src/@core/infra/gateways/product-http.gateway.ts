import { AxiosInstance } from "axios";
import { Product } from "../../domain/entities/product";
import { ProductGateway } from "../../domain/gateways/product.gateway";

export class ProductHttpGateway implements ProductGateway {
    constructor(private http: AxiosInstance) { }

    findAll(): Promise<Product[]> {
        return this.http.get<Product[]>("/products").then((res) =>
            res.data.map((data) =>
                new Product({
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    price: data.price
                })
            )
        )
    }

    findById(id: number): Promise<Product> {
        return this.http.get<Product>(`/products/${id}`).then((res) => {
            return new Product({
                id: res.data.id,
                title: res.data.title,
                description: res.data.description,
                price: res.data.price,
            })
        })
    }

    findByLimit(limit: number): Promise<Product[]> {
        return this.http.get<Product[]>(`/products?limit=${limit}`).then((res) =>
            res.data.map((data) =>
                new Product({
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    price: data.price
                })
            )
        )
    }
}