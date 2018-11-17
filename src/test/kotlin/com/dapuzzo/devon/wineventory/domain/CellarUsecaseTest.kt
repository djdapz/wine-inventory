package com.dapuzzo.devon.wineventory.domain

import com.dapuzzo.devon.wineventory.randomWine
import com.nhaarman.mockito_kotlin.mock
import com.nhaarman.mockito_kotlin.verify
import com.nhaarman.mockito_kotlin.whenever
import org.junit.Test


internal class CellarUsecaseTest{

    private val wineWriter = mock<WineWriter>()
    private val wineReader = mock<WineReader>()
    val subject = CellarUsecase(wineReader,  wineWriter)

    @Test
    fun shouldUpdateWineWithOneFewerThanTheRecordContained(){
        val id = 102
        val wine = randomWine(quantity = 12, id = id)

        whenever(wineReader.getWineById(id)).thenReturn(wine)

        subject.removeOneBottle(id)

        verify(wineWriter).changeQuantityOfBottlesInCellar(id,  11)
    }

    @Test
    fun shouldDeleteWineWhenRemovingTheLast(){
        val id = 102
        val wine = randomWine(quantity = 1, id = id)

        whenever(wineReader.getWineById(id)).thenReturn(wine)

        subject.removeOneBottle(id)

        verify(wineWriter).deleteWine(id)
    }
}