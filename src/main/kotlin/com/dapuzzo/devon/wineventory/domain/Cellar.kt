package com.dapuzzo.devon.wineventory.domain

import com.dapuzzo.devon.wineventory.web.Country

interface Cellar {
    fun removeOneBottle(id: Int)
}
