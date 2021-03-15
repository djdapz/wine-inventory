package com.dapuzzo.devon.wineventory.domain

data class NewWine(
        val type: String,
        val producer: String,
        val year: Int,
        val quantity: Int,
        val country: String,
        val cellarLocation: String?,
        val originalWoodenCase: Boolean,
        val bottleSize: Int,
        val notes: String?
) {
    constructor(
            type: String,
            producer: String,
            year: Int,
            quantity: Int,
            country: String,
            cellarLocation: String? = null,
            originalWoodenCase: Boolean? = null,
            bottleSize: Int? = null,
            notes: String? = null
    ) : this(
            type,
            producer,
            year,
            quantity,
            country,
            cellarLocation,
            originalWoodenCase ?: false,
            bottleSize ?: 750,
            notes
    )
}

interface WineWriter {
    fun save(userId: String, newWine: NewWine): Int
    fun changeQuantityOfBottlesInCellar(id: Int, newQuantity: Int)
    fun deleteWine(id: Int)
    fun updateWine(wine: Wine)
}
