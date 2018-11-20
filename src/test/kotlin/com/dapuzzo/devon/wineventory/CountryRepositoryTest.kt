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

        assertThat(subject.getAll().size).isEqualTo(246)
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

        val top5 = subject.getTop5()

        assertThat(top5.size).isEqualTo(5)

        assertThat(top5[0]).isEqualTo(listOf(
                Country("IT", "Italy"),
                Country("FR", "France"),
                Country("ES", "Spain"),
                Country("AT", "Austria"),
                Country("US", "United States")))
    }
}