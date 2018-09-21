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
            db.query("""
                SELECT * FROM wines
            """.trimIndent()) { rs: ResultSet, _: Int ->
                Wine(
                        type = rs.getString("type"),
                        producer = rs.getString("producer"),
                        year = rs.getInt("year"),
                        quantity = rs.getInt("quantity"),
                        id = rs.getInt("id")
                )
            }

    override fun save(type: String, producer: String, year: Int, quantity: Int): Int =
            GeneratedKeyHolder().run {
                db.update(
                        //language=sql
                        """
                INSERT INTO wines(type, producer, year, quantity)
                VALUES (:type, :producer, :year, :quantity)
            """.trimIndent(),
                        MapSqlParameterSource(
                                mapOf(
                                        "type" to type,
                                        "producer" to producer,
                                        "year" to year,
                                        "quantity" to quantity
                                )
                        ), this)
                this.keys!!["id"] as Int
            }


}