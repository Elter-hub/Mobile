export interface Cart {
    items: Item[];
    quantities: number[];
}

export interface Item {
    itemId: number;
    price: number;
    itemName: string;
    type: string;
    itemImageUrl: string;
    description: string;
    stars: number;
}
