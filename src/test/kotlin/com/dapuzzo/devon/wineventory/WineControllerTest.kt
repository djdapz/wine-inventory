package com.dapuzzo.devon.wineventory

import com.dapuzzo.devon.wineventory.domain.Cellar
import com.dapuzzo.devon.wineventory.domain.Wine
import com.dapuzzo.devon.wineventory.domain.WineReader
import com.dapuzzo.devon.wineventory.domain.WineWriter
import com.dapuzzo.devon.wineventory.web.WineController
import com.nhaarman.mockito_kotlin.any
import com.nhaarman.mockito_kotlin.mock
import com.nhaarman.mockito_kotlin.verify
import com.nhaarman.mockito_kotlin.whenever
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
    fun shouldCreateWine() {
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
                .expectStatus().isCreated

        verify(wineWriter).save(
                type = "Barolo",
                producer = "Lionello Marchesi",
                year = 2009,
                quantity = 10,
                country = "Italy",
                cellarLocation = "floor"
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
                id = 24
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
        whenever(wineWriter.save(any(), any(), any(), any(), any(), any())).thenReturn(8576309)
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
}