package com.dapuzzo.devon.wineventory.repo

import com.dapuzzo.devon.wineventory.domain.GetUsers
import com.dapuzzo.devon.wineventory.domain.User
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcOperations
import org.springframework.stereotype.Repository
import java.sql.ResultSet

@Repository
class UsersRepository : GetUsers {

    @Autowired
    lateinit var db: NamedParameterJdbcOperations

    override fun get(): List<User> {
        return db.query("""SELECT * FROM users""") { rs: ResultSet, rowNum: Int ->
            User(
                    rs.getInt("id"),
                    rs.getString("name")
            )
        }
    }
}