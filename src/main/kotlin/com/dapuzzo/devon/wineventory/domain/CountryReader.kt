package com.dapuzzo.devon.wineventory.domain

import com.dapuzzo.devon.wineventory.web.Country

interface CountryReader {
    fun getAll(): Collection<Country>
}
