export interface Wine {
    type: string;
    producer: string;
    year: number;
    quantity: number;
    country: string;
    cellarLocation?: string;
}