import com.dapuzzo.devon.wineventory.Country
import com.dapuzzo.devon.wineventory.WinenventoryApplication
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import io.netty.handler.codec.http.HttpHeaderValues.APPLICATION_JSON
import io.restassured.RestAssured.given
import org.assertj.core.api.Assertions.assertThat
import org.hamcrest.Matchers.equalTo
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.skyscreamer.jsonassert.JSONAssert
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.core.ParameterizedTypeReference
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner

@SpringBootTest(classes = [WinenventoryApplication::class])
@RunWith(SpringJUnit4ClassRunner::class)
open class ApplicationTest {

    @Autowired
    lateinit var jdbcTemplate: JdbcTemplate

    @Before
    fun setUp() {

        jdbcTemplate.execute("TRUNCATE TABLE wines")
    }

    @Test
    fun shouldFetchWineFromDatabase() {
        given()
                //language=json
                .body("""
                    {
                      "type": "Barolo",
                      "producer": "Lionello Marchesi",
                      "year": 2009,
                      "quantity": 10,
                      "country": "Italy"
                    }
                """.trimIndent())
                .contentType(APPLICATION_JSON.toString())
                .`when`()
                .post("/wine")
                .then()
                .statusCode(201)

        val body = given()
                .`when`()
                .get("/wine")
                .andReturn()
                .body.print()

        JSONAssert.assertEquals(body,
                //language=json
                """
                    {
                      "wine": [
                         {
                          "type": "Barolo",
                          "producer": "Lionello Marchesi",
                          "year": 2009,
                          "quantity": 10,
                          "country": "Italy"
                        }
                      ]
                    }

                """.trimIndent(), false)
    }

    @Test
    fun shouldServeListOfAllCountriesForDropdown() {
        val countries = given()
                .get("/countries")
                .andReturn()
                .body.print()

        val list: List<Country> = jacksonObjectMapper().readValue(countries)

        assertThat(list.size).isEqualTo(246)
    }
}
