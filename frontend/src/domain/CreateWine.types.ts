export interface CreateWineRequest {
    type?: string;
    producer?: string;
    year?: number;
    cellarLocation?: string;
    quantity?: number;
    country?: string;
}

export const isWineRequestReadyToSubmit = (request: CreateWineRequest) =>
    request.type !== ""
    && request.type !== undefined
    && request.producer !== ""
    && request.producer !== undefined
    && request.country !== ""
    && request.country !== undefined
    && request.quantity !== undefined
    && request.quantity > 0
    && request.year !== undefined
    && request.year > 0;