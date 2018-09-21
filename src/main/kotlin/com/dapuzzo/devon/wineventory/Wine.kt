package com.dapuzzo.devon.wineventory

data class Wine(
        val type: String,
        val producer: String,
        val year: Int,
        val quantity: Int,
        val id: Int
)