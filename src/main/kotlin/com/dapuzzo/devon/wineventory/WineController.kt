package com.dapuzzo.devon.wineventory

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController("/wines")
class WineController(
        private val wineReader: WineReader,
        private val wineWriter: WineWriter
) {

    data class WineRequest(
            val type: String,
            val producer: String,
            val year: Int,
            val quantity: Int
    )

    data class WineResponse(val wine: Collection<Wine>)

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createWine(@RequestBody request: WineRequest) = wineWriter.save(
            type = request.type,
            producer = request.producer,
            year = request.year,
            quantity = request.quantity
    )

    @GetMapping
    fun getWine() = WineResponse(wineReader.getAll())

}