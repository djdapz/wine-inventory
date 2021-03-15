package com.dapuzzo.devon.wineventory.domain

interface WineReader {
    fun getAll(userId: String): List<Wine>
    fun getWineById(id: Int): Wine
}
