package com.dapuzzo.devon.wineventory.web

import com.dapuzzo.devon.wineventory.domain.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.net.URI

@RestController()
class WineController(
        private val wineReader: WineReader,
        private val wineWriter: WineWriter,
        private val cellar: Cellar
) {

    data class WineRequest(
            val type: String,
            val producer: String,
            val year: Int,
            val quantity: Int,
            val country: String,
            val cellarLocation: String?,
            val originalWoodenCase: Boolean?,
            val bottleSize: Int?,
            val notes: String?
    )

    data class RemoveBottleFromCellarRequest(val id: Int)

    data class WineResponse(val wine: List<Wine>)

    @PostMapping("/wine")
    @ResponseStatus(HttpStatus.CREATED)
    fun createWine(@RequestBody request: WineRequest): ResponseEntity<Unit> = wineWriter.save(
            NewWine(
                    type = request.type,
                    producer = request.producer,
                    year = request.year,
                    quantity = request.quantity,
                    country = request.country,
                    cellarLocation = request.cellarLocation,
                    originalWoodenCase = request.originalWoodenCase,
                    bottleSize = request.bottleSize,
                    notes = request.notes
            )
    ).run { ResponseEntity.created(URI("/wine/$this")).build() }

    @GetMapping("/wine")
    fun getWine() = WineResponse(wineReader.getAll())

    @PostMapping("/wine/remove-bottle-from-cellar")
    fun removeWineFromCellar(@RequestBody body: RemoveBottleFromCellarRequest) {
        cellar.removeOneBottle(body.id)
    }

}