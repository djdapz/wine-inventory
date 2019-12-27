package com.dapuzzo.devon.wineventory.domain

interface WineReader {
    fun getAll(userId: Int): List<Wine>
    fun getWineById(id: Int): Wine
}
