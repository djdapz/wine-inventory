package com.dapuzzo.devon.wineventory

import com.dapuzzo.devon.wineventory.domain.NewWine
import com.dapuzzo.devon.wineventory.domain.Wine
import com.dapuzzo.devon.wineventory.repo.WineRepository
import com.github.javafaker.Faker
import org.assertj.core.api.Assertions.assertThat
import org.junit.After
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.jdbc.Sql
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner::class)
@ActiveProfiles("test")
@Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = ["classpath:cleanup.sql"])
class WineRepositoryTest {
    val faker = Faker()
    val userId = 11234

    @Autowired
    lateinit var jdbcTemplate: JdbcTemplate

    @Before
    fun setUp() {
        jdbcTemplate.update("INSERT INTO users(id, name) values(11234, 'Joe Joe')")
        jdbcTemplate.update("INSERT INTO users(id, name) values(23123, 'Nowhere Man')")
    }


    @Test
    fun `should only get wine for a given user`() {
        val subject = WineRepository(jdbcTemplate)
        subject.save(11234, randomNewWine())
        subject.save(11234, randomNewWine())
        subject.save(11234, randomNewWine())
        subject.save(23123, randomNewWine())

        val wines = subject.getAll(23123)

        assertThat(wines).hasSize(1)
    }


    @Test
    fun shouldReadAndWriteWine() {
        val subject = WineRepository(jdbcTemplate)

        val type = "Barolo"
        val producer = "Monteverde"
        val year = 2001
        val quantity = 12
        val country = "Italy"
        val cellarLocation = "floor"
        val notes = "this is a good wine"

        val expected = subject.save(userId, NewWine(
                type = type,
                producer = producer,
                year = year,
                quantity = quantity,
                country = country,
                cellarLocation = cellarLocation,
                notes = notes
        )).run {
            Wine(
                    type = type,
                    producer = producer,
                    year = year,
                    quantity = quantity,
                    country = country,
                    id = this,
                    cellarLocation = cellarLocation,
                    originalWoodenCase = false,
                    bottleSize = 750,
                    notes = notes
            )
        }

        assertThat(subject.getAll(userId)).contains(expected)
    }

    @Test
    fun shouldAllowNullsForNotesAndCellarLocation() {
        val subject = WineRepository(jdbcTemplate)

        val type = "Barolo"
        val producer = "Monteverde"
        val year = 2001
        val quantity = 12
        val country = "Italy"

        val expected = subject.save(userId, NewWine(type, producer, year, quantity, country)).run {
            Wine(
                    type = type,
                    producer = producer,
                    year = year,
                    quantity = quantity,
                    country = country,
                    id = this,
                    cellarLocation = null,
                    notes = null,
                    originalWoodenCase = false,
                    bottleSize = 750
            )
        }

        assertThat(subject.getAll(userId)).contains(expected)
    }

    @Test
    fun shouldUpdateWineRecord() {
        val subject = WineRepository(jdbcTemplate)
        val firstWine = randomWine()

        val id = subject.save(userId, NewWine(
                type = firstWine.type,
                producer = firstWine.producer,
                year = firstWine.year,
                quantity = firstWine.quantity,
                country = firstWine.country,
                cellarLocation = firstWine.cellarLocation
        ))

        val updatedWine = randomWine(id)

        subject.updateWine(updatedWine)

        val actualUpdatedWine = subject.getWineById(id)

        assertThat(actualUpdatedWine).isEqualTo(updatedWine)
    }

    @Test
    fun shouldDeleteWineRecord() {
        val subject = WineRepository(jdbcTemplate)
        val firstWine = randomWine()

        val id = subject.save(userId, NewWine(
                type = firstWine.type,
                producer = firstWine.producer,
                year = firstWine.year,
                quantity = firstWine.quantity,
                country = firstWine.country,
                cellarLocation = firstWine.cellarLocation
        ))

        val sizeBeforeDelete = subject.getAll(userId).size

        subject.deleteWine(id)

        val sizeAfterDelete = subject.getAll(userId).size
        val expetedSizeAfterDelete = sizeBeforeDelete - 1

        assertThat(sizeAfterDelete).isEqualTo(expetedSizeAfterDelete)
    }

    @Test
    fun shouldChangeQuantity() {
        val subject = WineRepository(jdbcTemplate)
        val firstWine = randomWine()

        val id = subject.save(userId, NewWine(
                type = firstWine.type,
                producer = firstWine.producer,
                year = firstWine.year,
                quantity = firstWine.quantity,
                country = firstWine.country,
                cellarLocation = firstWine.cellarLocation
        ))

        subject.changeQuantityOfBottlesInCellar(id, firstWine.quantity - 1)
        val quantityAfter = subject.getWineById(id).quantity

        assertThat(quantityAfter).isEqualTo(firstWine.quantity - 1)
    }
}