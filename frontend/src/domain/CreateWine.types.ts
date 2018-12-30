import {Wine} from "./Wine.types";

export interface WineRequest {
    type?: string;
    producer?: string;
    year?: number;
    cellarLocation?: string;
    quantity?: number;
    country?: string;
    originalWoodenCase?: boolean,
    notes?: string,
    bottleSize?: number
}

export const isWineRequestReadyToSubmit = (request: WineRequest) =>
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

export const areEquivalent = (wine: Wine, wineRequest: WineRequest) =>
    Object.keys(wineRequest)
        .reduce((prev: boolean, key: string) => wineRequest[key] === wine[key] && prev, true)
