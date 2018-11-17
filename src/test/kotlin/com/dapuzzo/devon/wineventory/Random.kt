package com.dapuzzo.devon.wineventory

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
        id = id
)