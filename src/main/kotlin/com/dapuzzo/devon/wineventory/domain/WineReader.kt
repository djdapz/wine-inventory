package com.dapuzzo.devon.wineventory.domain

interface WineReader {
    fun getAll(): List<Wine>
    fun getWineById(id: Int): Wine
}
