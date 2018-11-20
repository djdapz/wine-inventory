package com.dapuzzo.devon.wineventory.web

import com.dapuzzo.devon.wineventory.domain.CountryReader
import org.springframework.web.bind.annotation.*

data class Country(val code: String, val name: String)

@RestController()
class CountryController(val countryReader: CountryReader) {
    data class CountryListResponse(val countries: Collection<Country>)

    @GetMapping("/country/all")
    fun getAll(): CountryListResponse = CountryListResponse(countryReader.getAll())

    @GetMapping("/country/top-5")
    fun getTop5(): CountryListResponse = CountryListResponse(countryReader.getTop5())

}