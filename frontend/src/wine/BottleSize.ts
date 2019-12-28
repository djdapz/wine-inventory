export class BottleSize {
    constructor(private readonly sizeInMl: number) {

    }

    get display() {
        if(this.sizeInMl > 999){
            return `${this.sizeInMl/1000} L`
        }

        return `${this.sizeInMl} mL`
    }
}