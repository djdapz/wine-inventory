package com.dapuzzo.devon.wineventory.web

import com.dapuzzo.devon.wineventory.domain.CreateUser
import com.dapuzzo.devon.wineventory.domain.GetUsers
import com.dapuzzo.devon.wineventory.domain.User
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class UsersController(
    val getUsersUsecase: GetUsers,
    val createUserUsecase: CreateUser
) {
    data class UsersResponse(val users: List<User>)

    @GetMapping("/users")
    fun getUsers() = UsersResponse(users = getUsersUsecase.get())

    @PostMapping("/users")
    fun createUser(@RequestBody newUserRequest: NewUserRequest) {
        createUserUsecase.create(newUserRequest.name)
    }

    data class NewUserRequest (val name: String)


}