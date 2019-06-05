package com.dapuzzo.devon.wineventory

import com.dapuzzo.devon.wineventory.domain.*
import com.dapuzzo.devon.wineventory.web.WineController
import com.nhaarman.mockitokotlin2.*
import org.assertj.core.api.Assertions.assertThat
import org.hamcrest.Matchers.equalTo
import org.junit.Test
import org.springframework.http.MediaType
import org.springframework.test.web.reactive.server.WebTestClient
import org.springframework.test.web.reactive.server.body
import reactor.core.publisher.Mono.just


class WineControllerTest {

    private val wineReader = mock<WineReader>()
    private val wineWriter = mock<WineWriter>()
    private val cellar = mock<Cellar>()
    private val subject = WineController(wineReader, wineWriter, cellar)
    private val testClient = WebTestClient.bindToController(subject).build()

    @Test
    fun shouldCreateWineWithMinumInfo() {
        testClient.post()
                .uri("/wine")
                .contentType(MediaType.APPLICATION_JSON)
                .body(just("""
                    {
                      "type": "Barolo",
                      "producer": "Lionello Marchesi",
                      "year": 2009,
                      "country": "Italy",
                      "quantity": 10
                    }
                """.trimIndent()))
                .exchange()
                .expectStatus().isCreated

        verify(wineWriter).save(
                NewWine(
                        type = "Barolo",
                        producer = "Lionello Marchesi",
                        year = 2009,
                        quantity = 10,
                        country = "Italy"
                )
        )
    }

    @Test
    fun shouldCreateWineWithMinumInfoAsNulls() {
        testClient.post()
                .uri("/wine")
                .contentType(MediaType.APPLICATION_JSON)
                .body(just("""
                    {

                          "type": "2 buck chuck",
                          "producer": "Charles Shaw",
                          "year": 2019,
                          "quantity": 15,
                          "country": "California",
                          "cellarLocation": "floor",
                          "bottleSize": null,
                          "originalWoodenCase": null,
                          "notes": null

                    }
                """.trimIndent()))
                .exchange()
                .expectStatus().isCreated

        verify(wineWriter).save(
                NewWine(
                        type = "2 buck chuck",
                        producer = "Charles Shaw",
                        year = 2019,
                        quantity = 15,
                        country = "California",
                        cellarLocation = "floor"
                )
        )
    }


    @Test
    fun shouldCreateWine() {
        testClient.post()
                .uri("/wine")
                .contentType(MediaType.APPLICATION_JSON)
                //language=json
                .body(just("""
                    {
                      "type": "Barolo",
                      "producer": "Lionello Marchesi",
                      "year": 2009,
                      "country": "Italy",
                      "quantity": 10,
                      "cellarLocation": "floor",
                      "originalWoodenCase": true,
                      "bottleSize": 1000,
                      "notes": "this wine is cool"
                    }
                """.trimIndent()))
                .exchange()
                .expectStatus().isCreated

        verify(wineWriter).save(
                NewWine(
                        type = "Barolo",
                        producer = "Lionello Marchesi",
                        year = 2009,
                        quantity = 10,
                        country = "Italy",
                        cellarLocation = "floor",
                        originalWoodenCase = true,
                        bottleSize = 1000,
                        notes = "this wine is cool"
                )
        )
    }

    @Test
    fun shouldGetWine() {
        val expectedWine = Wine(
                type = "Barolo",
                quantity = 10,
                producer = "Lionello Marchesi",
                year = 2009,
                country = "Italy",
                cellarLocation = "floor",
                id = 24,
                originalWoodenCase = true,
                bottleSize = 1000,
                notes = "this wine is cool"

        )
        whenever(wineReader.getAll()).thenReturn(listOf(expectedWine))

        val wines: WineController.WineResponse = testClient.get()
                .uri("/wine")
                .exchange()
                .returnResult(WineController.WineResponse::class.java)
                .responseBody
                .blockFirst()!!

        assertThat(wines.wine).containsExactly(expectedWine)
    }

    @Test
    fun shouldReturnLocationWhenNewWineIsCreated() {
        whenever(wineWriter.save(any())).thenReturn(8576309)

        testClient.post()
                .uri("/wine")
                .contentType(MediaType.APPLICATION_JSON)
                .body(just("""
                    {
                      "type": "Barolo",
                      "producer": "Lionello Marchesi",
                      "year": 2009,
                      "country": "Italy",
                      "quantity": 10,
                      "cellarLocation": "floor"
                    }
                """.trimIndent()))
                .exchange()
                .expectHeader()
                .value("Location", equalTo("/wine/8576309"))
    }


    @Test
    fun shouldCallCellarToRemoveWIne() {
        testClient.post()
                .uri("/wine/remove-bottle-from-cellar")
                .contentType(MediaType.APPLICATION_JSON)
                .body(just("""
                    {"id": "12"}
                """.trimIndent()))
                .exchange()
                .expectStatus()
                .isOk

        verify(cellar).removeOneBottle(12)
    }

    @Test
    fun shouldGetWineInfoById() {
        val expectedWine = randomWine(id = 12)

        whenever(wineReader.getWineById(12)).doReturn(expectedWine)

        val wine: Wine = testClient.get()
                .uri("/wine/12")
                .exchange()
                .returnResult(Wine::class.java)
                .responseBody
                .blockFirst()!!

        assertThat(wine).isEqualTo(expectedWine)
    }

}