package com.dapuzzo.devon.wineventory.domain

interface WineWriter {
    fun save(type: String, producer: String, year: Int, quantity: Int, country: String, cellarLocation: String?) : Int
    fun changeQuantityOfBottlesInCellar(id: Int, newQuantity: Int)
    fun deleteWine(id: Int)
}
