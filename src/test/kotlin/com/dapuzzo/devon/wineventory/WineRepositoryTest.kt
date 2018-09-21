package com.dapuzzo.devon.wineventory

import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner::class)
open class WineRepositoryTest {

    @Autowired
    lateinit var jdbcTemplate: JdbcTemplate

    @Test
    fun shouldReadAndWriteWine() {
        val subject = WineRepository(jdbcTemplate)

        val type = "Barolo"
        val producer = "Monteverde"
        val year = 2001
        val quantity = 12

        val expected = subject.save(type, producer, year, quantity).run {
            Wine(
                    type = type,
                    producer = producer,
                    year = year,
                    quantity = quantity,
                    id = this
            )
        }

        assertThat(subject.getAll()).contains(expected)

    }
}