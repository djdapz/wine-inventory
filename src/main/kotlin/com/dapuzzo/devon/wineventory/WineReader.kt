package com.dapuzzo.devon.wineventory

interface WineReader {
    fun getAll(): Collection<Wine>
}
