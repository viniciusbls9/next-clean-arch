export type ProductsProps = {
    id: number
    title: string
    description: string
    price: number
}

export class Product {
    constructor(public props: ProductsProps) { }

    get id() {
        return this.props.id
    }

    get title() {
        return this.props.title
    }

    get description() {
        return this.props.description
    }

    get price() {
        return this.props.price
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            price: this.price
        }
    }
}