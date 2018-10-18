package com.dapuzzo.devon.wineventory

interface WineWriter {
    fun save(type: String, producer: String, year: Int, quantity: Int, country: String) : Int
}
