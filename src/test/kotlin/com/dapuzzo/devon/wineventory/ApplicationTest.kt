import com.dapuzzo.devon.wineventory.WinenventoryApplication
import com.dapuzzo.devon.wineventory.web.CountryController
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import io.restassured.RestAssured.given
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.skyscreamer.jsonassert.JSONAssert
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.web.server.LocalServerPort
import org.springframework.http.MediaType.APPLICATION_JSON
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.jdbc.Sql
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner
import java.math.BigInteger


@SpringBootTest(classes = [WinenventoryApplication::class], webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@RunWith(SpringJUnit4ClassRunner::class)
@ActiveProfiles("test")
@Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = ["classpath:cleanup.sql"])
class ApplicationTest {

    @LocalServerPort
    lateinit var port: BigInteger

    @Test
    fun shouldFetchWineFromDatabase() {
        createWine()

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
                          "cellarLocation": "floor",
                          "notes": "Super special wine",
                          "originalWoodenCase": true,
                          "bottleSize": 750
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

    @Test
    fun shouldServeListOfTop5CountriesForDropdown() {
        createWine("Italy")
        createWine("Italy")
        createWine("Italy")
        createWine("France")
        createWine("France")
        createWine("United States")
        createWine("United States")
        createWine("Spain")
        createWine("Spain")
        createWine("China")
        createWine("China")

        val countries = given().port(port.toInt())
                .get("/country/top-5")
                .andReturn()
                .body.print()

        val list: CountryController.CountryListResponse = jacksonObjectMapper().readValue(countries)

        assertThat(list.countries.size).isEqualTo(5)
    }

    @Test
    fun `should remove to quantity of wines`() {
        val id = given().port(port.toInt())
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
                .and().extract()
                .header("Location")!!.substringAfter("/wine/")

        given().port(port.toInt())
                .`when`()
                .body("""{"id": $id}""")
                .contentType(APPLICATION_JSON.toString())
                .post("/wine/remove-bottle-from-cellar")
                .then()
                .log().body()
                .statusCode(200)

        val remainingWine = given().port(port.toInt())
                .`when`()
                .get("/wine")
                .then()
                .statusCode(200)
                .extract()
                .jsonPath()
                .getInt("wine[0].quantity")

        assertThat(remainingWine).isEqualTo(9)
    }

    @Test
    fun shouldCreateAndUpdateWineRecords() {
        val location = createWine()
        val id = location.removePrefix("/wine/")

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
                          "cellarLocation": "floor",
                          "notes": "Super special wine",
                          "originalWoodenCase": true,
                          "bottleSize": 750,
                          "id": $id
                        }
                      ]
                    }

                """.trimIndent(), body, true)

        given().port(port.toInt())
                .body(
                        //language=json
                        """
                        {
                          "type": "A different wine",
                          "producer": "A different producer",
                          "year": 2011,
                          "quantity": 100,
                          "country": "Spain",
                          "cellarLocation": "Upper Right",
                          "bottleSize": "1500",
                          "originalWoodenCase": false,
                          "notes": "Super ok wine"
                        }
                    """.trimIndent())
                .contentType(APPLICATION_JSON.toString())
                .`when`()
                .put(location)
                .then()
                .statusCode(200)


        val updatedBody = given().port(port.toInt())
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
                           "type": "A different wine",
                          "producer": "A different producer",
                          "year": 2011,
                          "quantity": 100,
                          "country": "Spain",
                          "cellarLocation": "Upper Right",
                          "bottleSize": 1500,
                          "originalWoodenCase": false,
                          "notes": "Super ok wine",
                          "id": $id
                        }
                      ]
                    }

                """.trimIndent(), updatedBody, true)
    }

    private fun createWine(country: String = "Italy") = given().port(port.toInt())
            //language=json
            .body("""
                        {
                          "type": "Barolo",
                          "producer": "Lionello Marchesi",
                          "year": 2009,
                          "quantity": 10,
                          "country": "$country",
                          "cellarLocation": "floor",
                          "bottleSize": "750",
                          "originalWoodenCase": true,
                          "notes": "Super special wine"
                        }
                    """.trimIndent())
            .contentType(APPLICATION_JSON.toString())
            .`when`()
            .post("/wine")
            .then()
            .statusCode(201)

            .and().extract()
            .header("Location")
}
