package com.dapuzzo.devon.wineventory

import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.jdbc.support.GeneratedKeyHolder
import org.springframework.stereotype.Component
import java.sql.ResultSet

@Component
class WineRepository(jdbcTemplate: JdbcTemplate) : WineWriter, WineReader {
    private val db = NamedParameterJdbcTemplate(jdbcTemplate)

    override fun getAll(): Collection<Wine> =
            db.query(
                    //language=sql
                    """
                SELECT * FROM wines
                INNER JOIN country on wines.country_code = country.country_code
            """.trimIndent()) { rs: ResultSet, _: Int ->
                Wine(
                        type = rs.getString("type"),
                        producer = rs.getString("producer"),
                        year = rs.getInt("year"),
                        quantity = rs.getInt("quantity"),
                        id = rs.getInt("id"),
                        country = rs.getString("country_name")
                )
            }

    override fun save(type: String, producer: String, year: Int, quantity: Int, country: String): Int =
            GeneratedKeyHolder().run {
                db.update(
                        //language=sql
                        """
                INSERT INTO wines(type, producer, year, quantity, country_code)
                VALUES (:type, :producer, :year, :quantity, (SELECT country_code  from country WHERE country_name LIKE :country))
            """.trimIndent(),
                        MapSqlParameterSource(
                                mapOf(
                                        "type" to type,
                                        "producer" to producer,
                                        "year" to year,
                                        "quantity" to quantity,
                                        "country" to country
                                )
                        ), this)
                this.keys!!["id"] as Int
            }


}