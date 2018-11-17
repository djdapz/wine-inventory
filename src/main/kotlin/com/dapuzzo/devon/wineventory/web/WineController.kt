package com.dapuzzo.devon.wineventory.web

import com.dapuzzo.devon.wineventory.domain.Cellar
import com.dapuzzo.devon.wineventory.domain.Wine
import com.dapuzzo.devon.wineventory.domain.WineReader
import com.dapuzzo.devon.wineventory.domain.WineWriter
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
            val cellarLocation: String?
    )

    data class RemoveBottleFromCellarRequest(val id: Int)

    data class WineResponse(val wine: List<Wine>)

    @PostMapping("/wine")
    @ResponseStatus(HttpStatus.CREATED)
    fun createWine(@RequestBody request: WineRequest): ResponseEntity<Unit> = wineWriter.save(
            type = request.type,
            producer = request.producer,
            year = request.year,
            quantity = request.quantity,
            country = request.country,
            cellarLocation = request.cellarLocation
    ).run { ResponseEntity.created(URI("/wine/${this}")).build() }

    @GetMapping("/wine")
    fun getWine() = WineResponse(wineReader.getAll())

    @PostMapping("/wine/remove-bottle-from-cellar")
    fun removeWineFromCellar(@RequestBody body: RemoveBottleFromCellarRequest) {
        cellar.removeOneBottle(body.id)
    }

}