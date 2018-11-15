export class CreateWineRequest {
    type: string;
    producer: string;
    year?: number;
    cellarLocation?: string;
    quantity?: number;
    country: string;

    constructor(type: string = "", producer: string = "", year?: number, quantity?: number, country: string = "", cellarLocation: string = "") {
        this.type = type;
        this.producer = producer;
        this.year = year;
        this.quantity = quantity;
        this.country = country;
        this.cellarLocation = cellarLocation;
    }

    withYear(year: number) {
        return new CreateWineRequest(
            this.type,
            this.producer,
            year,
            this.quantity,
            this.country,
            this.cellarLocation
        )
    }

    withProducer(producer: string) {
        return new CreateWineRequest(
            this.type,
            producer,
            this.year,
            this.quantity,
            this.country,
            this.cellarLocation
        )
    }

    withType(type: string) {
        return new CreateWineRequest(
            type,
            this.producer,
            this.year,
            this.quantity,
            this.country,
            this.cellarLocation
        )
    }

    withQuantity(quantity: number) {
        return new CreateWineRequest(
            this.type,
            this.producer,
            this.year,
            quantity,
            this.country,
            this.cellarLocation
        )
    }

    withCountry(country: string) {
        return new CreateWineRequest(
            this.type,
            this.producer,
            this.year,
            this.quantity,
            country,
            this.cellarLocation
        )
    }

    withCellarLocation(cellarLocation: string) {
        return new CreateWineRequest(
            this.type,
            this.producer,
            this.year,
            this.quantity,
            this.country,
            cellarLocation
        )
    }

    isComplete() {
        return this.type !== ""
            && this.producer !== ""
            && this.country !== ""
            && this.quantity !== undefined
            && this.quantity > 0
            && this.year !== undefined
            && this.year > 0
    }

}