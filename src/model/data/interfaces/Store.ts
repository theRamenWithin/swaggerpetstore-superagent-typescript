export interface Inventory {
    [key: string]: number
}

export interface Order {
    id: number,
    petId: number,
    quantity: number,
    shipDate: string,
    status: string,
    complete: boolean
}