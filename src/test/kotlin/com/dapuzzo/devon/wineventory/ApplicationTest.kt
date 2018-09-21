import com.dapuzzo.devon.wineventory.WinenventoryApplication
import io.netty.handler.codec.http.HttpHeaderValues.APPLICATION_JSON
import io.restassured.RestAssured.given
import org.hamcrest.Matchers.equalTo
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner

@SpringBootTest(classes = [WinenventoryApplication::class])
@RunWith(SpringJUnit4ClassRunner::class)
open class ApplicationTest {

    @Autowired
    lateinit var jdbcTemplate: JdbcTemplate

    @Test
    fun shouldFetchWineFromDatabase() {
        given()
                //language=json
                .body("""
                    {
                      "type": "Barolo",
                      "producer": "Lionello Marchesi",
                      "year": 2009,
                      "quantity": 10
                    }
                """.trimIndent())
                .contentType(APPLICATION_JSON.toString())
                .`when`()
                .post("/wine")
                .then()
                .statusCode(201)

        given()
                .`when`()
                .get("/wine")
                .then()
                //language=json
                .content(equalTo("""
                    {
                      "wines": [
                         {
                          "type": "Barolo",
                          "producer": "Lionello Marchesi",
                          "year": 2009,
                          "quantity": 10
                        }
                      ]
                    }

                """.trimIndent())
                )

    }
}