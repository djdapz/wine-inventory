package com.dapuzzo.devon.wineventory

import com.dapuzzo.devon.wineventory.domain.NewWine
import com.dapuzzo.devon.wineventory.domain.Wine
import com.github.javafaker.Faker

val faker = Faker()

fun randomWine(
        id: Int = faker.number().randomNumber().toInt(),
        quantity: Int = faker.number().randomNumber().toInt()
) = Wine(
        type = faker.beer().style(),
        producer = faker.company().name(),
        year = faker.number().numberBetween(1920, 2018),
        quantity = quantity,
        cellarLocation = faker.rickAndMorty().location(),
        country = "France",
        id = id,
        bottleSize = faker.number().numberBetween(375, 5000),
        notes = faker.rickAndMorty().quote(),
        originalWoodenCase = faker.bool().bool()

)

fun randomNewWine() = NewWine(
        type = faker.beer().style(),
        producer = faker.company().name(),
        year = faker.number().numberBetween(1920, 2018),
        quantity = faker.number().numberBetween(1, 10),
        cellarLocation = faker.rickAndMorty().location(),
        country = "France",
        bottleSize = faker.number().numberBetween(375, 5000),
        notes = faker.rickAndMorty().quote(),
        originalWoodenCase = faker.bool().bool()
)