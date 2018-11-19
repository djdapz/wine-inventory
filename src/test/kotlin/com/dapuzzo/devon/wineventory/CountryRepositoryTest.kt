package com.dapuzzo.devon.wineventory

import com.dapuzzo.devon.wineventory.repo.CountryRepository
import com.dapuzzo.devon.wineventory.repo.WineRepository
import com.dapuzzo.devon.wineventory.web.Country
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

        assertThat(subject.getAll().size).isEqualTo(246 + 5)
        assertThat(subject.getAll()).contains(Country("IT", "Italy"), Country("US", "United States"))
    }

    @Test
    fun shouldHaveTop5CountriesBasedOnWineRecords() {
        val subject = CountryRepository(jdbcTemplate)
        val wineRepo = WineRepository(jdbcTemplate)

        wineRepo.save("type", "producer", 2012, 1, "Italy", null)
        wineRepo.save("type", "producer", 2012, 1, "Italy", null)
        wineRepo.save("type", "producer", 2012, 1, "Italy", null)
        wineRepo.save("type", "producer", 2012, 1, "Italy", null)
        wineRepo.save("type", "producer", 2012, 1, "Italy", null)

        wineRepo.save("type", "producer", 2012, 1, "France", null)
        wineRepo.save("type", "producer", 2012, 1, "France", null)
        wineRepo.save("type", "producer", 2012, 1, "France", null)
        wineRepo.save("type", "producer", 2012, 1, "France", null)

        wineRepo.save("type", "producer", 2012, 1, "Spain", null)
        wineRepo.save("type", "producer", 2012, 1, "Spain", null)
        wineRepo.save("type", "producer", 2012, 1, "Spain", null)

        wineRepo.save("type", "producer", 2012, 1, "Austria", null)
        wineRepo.save("type", "producer", 2012, 1, "Austria", null)

        wineRepo.save("type", "producer", 2012, 1, "United States", null)

        assertThat(subject.getAll().size).isEqualTo(246 + 5)

        assertThat(subject.getAll()[0]).isEqualTo(Country("IT", "Italy"))
        assertThat(subject.getAll()[1]).isEqualTo(Country("FR", "France"))
        assertThat(subject.getAll()[2]).isEqualTo(Country("ES", "Spain"))
        assertThat(subject.getAll()[3]).isEqualTo(Country("AT", "Austria"))
        assertThat(subject.getAll()[4]).isEqualTo(Country("US", "United States"))
    }
}