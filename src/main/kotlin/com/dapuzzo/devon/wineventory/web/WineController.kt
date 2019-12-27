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
    fun createWine(
            @RequestBody request: WineRequest,
            @RequestHeader("userId") userId: Int
    ): ResponseEntity<Unit> {
        val id: Int = wineWriter.save(
                userId,
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
        )

        return ResponseEntity.created(URI("/wine/$id")).build()
    }

    @GetMapping("/wine")
    fun getWine(@RequestHeader("userId") userId: Int) = WineResponse(wineReader.getAll(userId))

    @GetMapping("/wine/{id}")
    fun getWineById(@PathVariable id: Int) = wineReader.getWineById(id)

    @PostMapping("/wine/remove-bottle-from-cellar")
    fun removeWineFromCellar(@RequestBody body: RemoveBottleFromCellarRequest) {
        cellar.removeOneBottle(body.id)
    }

    @PutMapping("/wine/{id}")
    fun saveWine(@RequestBody request: WineRequest, @PathVariable("id") id: Int) = wineWriter.updateWine(
            Wine(
                    type = request.type,
                    producer = request.producer,
                    year = request.year,
                    quantity = request.quantity,
                    country = request.country,
                    cellarLocation = request.cellarLocation,
                    originalWoodenCase = request.originalWoodenCase!!,
                    bottleSize = request.bottleSize!!,
                    notes = request.notes,
                    id = id
            )
    )


}