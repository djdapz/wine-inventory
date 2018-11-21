package com.dapuzzo.devon.wineventory

import com.dapuzzo.devon.wineventory.domain.CountryReader
import com.dapuzzo.devon.wineventory.web.Country
import com.dapuzzo.devon.wineventory.web.CountryController
import com.nhaarman.mockito_kotlin.mock
import com.nhaarman.mockito_kotlin.whenever
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.springframework.test.web.reactive.server.WebTestClient


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


    @Test
    fun shouldGetTop5() {
        val expectedCountries = listOf(
                Country("US", "United States")
        )
        whenever(countryReader.getTop5()).thenReturn(expectedCountries)

        val countriesResponse= testClient.get()
                .uri("/country/top-5")
                .exchange()
                .returnResult(CountryController.CountryListResponse::class.java)
                .responseBody
                .blockFirst()!!

        assertThat(countriesResponse.countries).containsExactlyElementsOf(expectedCountries)
    }
}