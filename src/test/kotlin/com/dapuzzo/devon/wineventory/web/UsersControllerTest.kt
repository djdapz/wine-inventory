package com.dapuzzo.devon.wineventory.web

import com.dapuzzo.devon.wineventory.domain.GetUsers
import com.dapuzzo.devon.wineventory.domain.User
import com.nhaarman.mockitokotlin2.mock
import com.nhaarman.mockitokotlin2.whenever
import org.junit.Before
import org.junit.Test
import org.springframework.test.web.reactive.server.WebTestClient


internal class UsersControllerTest{
    private val getUsers: GetUsers = mock()
    private val subject = UsersController(getUsers, mock())
    private val testClient = WebTestClient.bindToController(subject).build()

    @Before
    fun setUp() {
        whenever(getUsers.get()).thenReturn(listOf(
                User("12", "jimm"),
                User("23", "bobb")
        ))
    }

    @Test
    fun `should fetch users`(){
        testClient.get().uri("/users").exchange().expectBody().json("""
            {
                "users": [
                    {
                        "id": "12",
                        "name": "jimm"
                    },
                    {
                        "id": "23",
                        "name": "bobb"
                    }
                ]   
            }
        """.trimIndent())

    }

}