package com.dapuzzo.devon.wineventory.repo

import com.dapuzzo.devon.wineventory.domain.CreateUser
import com.dapuzzo.devon.wineventory.domain.GetUsers
import com.dapuzzo.devon.wineventory.domain.User
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcOperations
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.stereotype.Repository
import java.sql.ResultSet

@Repository
class UsersRepository(val jdbcTemplate: JdbcTemplate) : GetUsers, CreateUser {
    private val db = NamedParameterJdbcTemplate(jdbcTemplate)

    override fun get(): List<User> = db
        .query("""SELECT * FROM users""") { rs: ResultSet, rowNum: Int ->
            User(
                rs.getString("id"),
                rs.getString("name")
            )
        }

    override fun create(name: String) {
        db.update("""INSERT INTO users (name) values (:name)""", mapOf("name" to name))
    }
}