package com.dapuzzo.devon.wineventory.domain

data class Wine(
        val type: String,
        val producer: String,
        val year: Int,
        val quantity: Int,
        val country: String,
        val id: Int,
        val cellarLocation: String?
)