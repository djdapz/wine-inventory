package com.dapuzzo.devon.wineventory.domain

import com.dapuzzo.devon.wineventory.web.Country

interface CountryReader {
    fun getAll(): List<Country>
    fun getTop5(): List<Country>
}
