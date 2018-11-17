package com.dapuzzo.devon.wineventory.domain

import org.springframework.stereotype.Component

@Component
class CellarUsecase(val wineReader: WineReader, val wineWriter: WineWriter) : Cellar {
    override fun removeOneBottle(id: Int) {
        val quantity = wineReader.getWineById(id).quantity - 1
        if (quantity == 0) {
            wineWriter.deleteWine(id)
        } else {
            wineWriter.changeQuantityOfBottlesInCellar(id, quantity)
        }
    }
}
