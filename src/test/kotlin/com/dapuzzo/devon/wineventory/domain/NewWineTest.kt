package com.dapuzzo.devon.wineventory.domain

import org.assertj.core.api.Assertions.assertThat
import org.junit.Test


internal class NewWineTest {

    @Test
    fun shouldAcceptNullForBottleSize() {
        val subject = NewWine(
                type = "Barolo",
                producer = "Marchese",
                year = 2012,
                quantity = 1,
                country = "Italy",
                bottleSize = null
        )

        assertThat(subject.bottleSize).isEqualTo(750)
    }

    @Test
    fun shouldAcceptNullForOWC() {
        val subject = NewWine(
                type = "Barolo",
                producer = "Marchese",
                year = 2012,
                quantity = 1,
                country = "Italy",
                originalWoodenCase = null
        )

        assertThat(subject.originalWoodenCase).isEqualTo(false)
    }
}