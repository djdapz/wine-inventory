package com.dapuzzo.devon.wineventory.web

import com.dapuzzo.devon.wineventory.domain.GetUsers
import com.dapuzzo.devon.wineventory.domain.User
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class UsersController(val getUsersUsecase: GetUsers) {
    data class UsersResponse(val users: List<User>)

    @GetMapping("/users")
    fun getUsers() = UsersResponse(users = getUsersUsecase.get())
}