package com.dapuzzo.devon.wineventory

import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner::class)
@ActiveProfiles("test")
open class CountryRepositoryTest {

    @Autowired
    lateinit var jdbcTemplate: JdbcTemplate

    @Test
    fun shouldReadAndWriteWine() {
        val subject = CountryRepository(jdbcTemplate)

        assertThat(subject.getAll().size).isEqualTo(246)
        assertThat(subject.getAll()).contains(Country("IT", "Italy"), Country("US", "United States"))
    }
}