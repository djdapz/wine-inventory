import com.dapuzzo.devon.wineventory.Country
import com.dapuzzo.devon.wineventory.CountryController
import com.dapuzzo.devon.wineventory.WinenventoryApplication
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import io.restassured.RestAssured
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
import org.springframework.http.MediaType.APPLICATION_JSON
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner
import org.springframework.boot.web.server.LocalServerPort
import org.springframework.test.context.ActiveProfiles
import java.math.BigInteger


@SpringBootTest(classes = [WinenventoryApplication::class], webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@RunWith(SpringJUnit4ClassRunner::class)
@ActiveProfiles("test")
class ApplicationTest {

    @Autowired
    lateinit var jdbcTemplate: JdbcTemplate

    @LocalServerPort
    lateinit var port: BigInteger

    @Before
    fun setUp() {
        jdbcTemplate.execute("TRUNCATE TABLE wines")
    }

    @Test
    fun shouldFetchWineFromDatabase() {
        given().port(port.toInt())
                //language=json
                .body("""
                    {
                      "type": "Barolo",
                      "producer": "Lionello Marchesi",
                      "year": 2009,
                      "quantity": 10,
                      "country": "Italy",
                      "cellarLocation": "floor"
                    }
                """.trimIndent())
                .contentType(APPLICATION_JSON.toString())
                .`when`()
                .post("/wine")
                .then()
                .statusCode(201)

        val body = given().port(port.toInt())
                .`when`()
                .get("/wine")
                .andReturn()
                .body.print()

        JSONAssert.assertEquals(
                //language=json
                """
                    {
                      "wine": [
                         {
                          "type": "Barolo",
                          "producer": "Lionello Marchesi",
                          "year": 2009,
                          "quantity": 10,
                          "country": "Italy",
                          "cellarLocation": "floor"
                        }
                      ]
                    }

                """.trimIndent(), body, false)
    }

    @Test
    fun shouldServeListOfAllCountriesForDropdown() {
        val countries = given().port(port.toInt())
                .get("/country/all")
                .andReturn()
                .body.print()

        val list: CountryController.CountryListResponse = jacksonObjectMapper().readValue(countries)

        assertThat(list.countries.size).isEqualTo(246)
    }
}
