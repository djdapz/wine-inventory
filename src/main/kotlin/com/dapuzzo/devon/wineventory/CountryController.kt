package com.dapuzzo.devon.wineventory

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

data class Country(val code: String, val name: String)

@RestController()
class CountryController(val countryReader: CountryReader) {
    data class CountryListResponse(val countries: Collection<Country>)

    @GetMapping("/country/all")
    fun getAll(): CountryListResponse = CountryListResponse(countryReader.getAll())

}