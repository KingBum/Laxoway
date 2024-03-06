export interface IMenu {
    name: string;
    url: string;
}

export interface IPolicy {
    name: string;
    item: string[];
}

export interface IFood {
    name: string;
    image: string;
    description: string;
    price: number;
}

export interface IOffer {
    [x: string]: string;
    id: string;
    code: string;
}