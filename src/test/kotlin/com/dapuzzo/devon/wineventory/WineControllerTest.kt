package com.dapuzzo.devon.wineventory

import com.nhaarman.mockito_kotlin.mock
import com.nhaarman.mockito_kotlin.verify
import com.nhaarman.mockito_kotlin.whenever
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.springframework.http.MediaType
import org.springframework.test.web.reactive.server.WebTestClient
import org.springframework.test.web.reactive.server.body
import reactor.core.publisher.Mono.just


class WineControllerTest {

    private val wineReader = mock<WineReader>()
    private val wineWriter = mock<WineWriter>()
    private val subject = WineController(wineReader, wineWriter)
    private val testClient = WebTestClient.bindToController(subject).build()

    @Test
    fun shouldCreateWine() {
        testClient.post()
                .uri("/wines")
                .contentType(MediaType.APPLICATION_JSON)
                .body(just("""
                    {
                      "type": "Barolo",
                      "producer": "Lionello Marchesi",
                      "year": 2009,
                      "quantity": 10
                    }
                """.trimIndent()))
                .exchange()
                .expectStatus().isCreated

        verify(wineWriter).save(
                type = "Barolo",
                producer = "Lionello Marchesi",
                year = 2009,
                quantity = 10
        )
    }

    @Test
    fun shouldGetWine() {
        val expectedWine = Wine(
                type = "Barolo",
                quantity = 10,
                producer = "Lionello Marchesi",
                year = 2009,
                id = 24
        )
        whenever(wineReader.getAll()).thenReturn(listOf(expectedWine))

        val wines: WineController.WineResponse = testClient.get()
                .uri("/wines")
                .exchange()
                .returnResult(WineController.WineResponse::class.java)
                .responseBody
                .blockFirst()!!

        assertThat(wines.wine).containsExactly(expectedWine)
    }
}