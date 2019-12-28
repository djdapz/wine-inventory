export interface Wine {
    type: string;
    producer: string;
    year: number;
    quantity: number;
    country: string;
    id: number;
    originalWoodenCase: boolean;
    bottleSize: number;
    cellarLocation?: string;
    notes?: string;
}
