export interface signUp{
    name: string,
    email: string,
    password: string
}

export interface login{
    email: String,
    password: String,
}

export interface product{
    name:string,
    price:number,
    category:string,
    color:string,
    image:string,
    description:string,
    id:number,
    quantity: undefined | number
}
export interface cart{
    name:string,
    price:number,
    category:string,
    color:string,
    image:string,
    description:string,
    id:any  | undefined,
    quantity: undefined | number,
    productId:number,
    userId:number
}