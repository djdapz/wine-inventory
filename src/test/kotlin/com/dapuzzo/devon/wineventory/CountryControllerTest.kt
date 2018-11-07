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


class CountryControllerTest {

    private val countryReader = mock<CountryReader>()
    private val subject = CountryController(countryReader)
    private val testClient = WebTestClient.bindToController(subject).build()



    @Test
    fun shouldGetWine() {
        val expectedCountries = listOf(
                Country("US", "United States"),
                Country("IT", "Italy")
        )
        whenever(countryReader.getAll()).thenReturn(expectedCountries)

        val countriesResponse= testClient.get()
                .uri("/country/all")
                .exchange()
                .returnResult(CountryController.CountryListResponse::class.java)
                .responseBody
                .blockFirst()!!

        assertThat(countriesResponse.countries).containsExactlyElementsOf(expectedCountries)
    }
}