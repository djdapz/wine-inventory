package com.dapuzzo.devon.wineventory.repo

import com.dapuzzo.devon.wineventory.domain.GetUsers
import com.dapuzzo.devon.wineventory.domain.User
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.jdbc.core.JdbcOperations
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.jdbc.Sql
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner::class)
@ActiveProfiles("test")
@Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = ["classpath:cleanup.sql"])
internal class UsersRepositoryTest {

    @Autowired
    lateinit var db: JdbcOperations

    @Autowired
    lateinit var subject: GetUsers

    @Test
    fun `should get all users in db`() {
        db.update("INSERT INTO users values (24, 'lyle kane')")
        val users = subject.get()

        assertThat(users).containsExactly(
                User(1, "DEEDEE"),
                User(24, "lyle kane")
        )


    }

}