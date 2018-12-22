package com.dapuzzo.devon.wineventory.repo

import com.dapuzzo.devon.wineventory.domain.NewWine
import com.dapuzzo.devon.wineventory.domain.Wine
import com.dapuzzo.devon.wineventory.domain.WineReader
import com.dapuzzo.devon.wineventory.domain.WineWriter
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.jdbc.support.GeneratedKeyHolder
import org.springframework.stereotype.Component
import java.sql.ResultSet

@Component
class WineRepository(jdbcTemplate: JdbcTemplate) : WineWriter, WineReader {

    private val db = NamedParameterJdbcTemplate(jdbcTemplate)

    override fun deleteWine(id: Int) {
        db.update(
                //language=sql
                """
                DELETE FROM wines
                WHERE id=:id
            """.trimIndent(),
                MapSqlParameterSource(
                        mapOf(
                                "id" to id
                        )
                ))
    }


    override fun changeQuantityOfBottlesInCellar(id: Int, newQuantity: Int) {
        db.update(
                //language=sql
                """UPDATE wines
                    SET quantity = :quantity
                    where  id=:id
            """.trimIndent(),
                MapSqlParameterSource(
                        mapOf(
                                "id" to id,
                                "quantity" to newQuantity
                        )
                ))
    }

    override fun getWineById(id: Int): Wine = db.queryForObject(
            //language=sql
            """
                SELECT * FROM wines
                LEFT JOIN country on wines.country_code = country.country_code
                WHERE wines.id=:id
            """.trimIndent(),
            MapSqlParameterSource(mapOf("id" to id)),
            ::mapSqlRowToWine)!!


    fun updateWine(wine: Wine) {
        db.update(
                //language=sql
                """UPDATE wines
                    SET type = :type,
                        producer = :producer,
                        year = :year,
                        quantity = :quantity,
                        cellar_location = :cellar_location,
                        original_wooden_case= :original_wooden_case,
                        bottle_size= :bottle_size,
                        notes= :notes,
                        country_code =(
                           SELECT country_code
                           from country
                           WHERE country_name
                           LIKE :country)
                        where  id=:id
            """.trimIndent(),
                MapSqlParameterSource(
                        mapOf(
                                "id" to wine.id,
                                "type" to wine.type,
                                "producer" to wine.producer,
                                "year" to wine.year,
                                "quantity" to wine.quantity,
                                "country" to wine.country,
                                "cellar_location" to wine.cellarLocation,
                                "original_wooden_case" to wine.originalWoodenCase,
                                "bottle_size" to wine.bottleSize,
                                "notes" to wine.notes
                        )
                ))
    }

    override fun getAll(): List<Wine> =
            db.query(
                    //language=sql
                    """
                SELECT * FROM wines
                LEFT JOIN country on wines.country_code = country.country_code
            """.trimIndent(), ::mapSqlRowToWine)

    override fun save(newWine: NewWine): Int =
            GeneratedKeyHolder().run {
                db.update(
//                        language=sql
                        """
INSERT INTO wines(type,
                  producer,
                  year,
                  quantity,
                  cellar_location,
                  original_wooden_case,
                  bottle_size,
                  notes,
                  country_code)
VALUES (:type,
        :producer,
        :year,
        :quantity,
        :cellar_location,
        :original_wooden_case,
        :bottle_size,
        :notes,
        (SELECT country_code from country WHERE country_name LIKE :country))
            """.trimIndent(),
                        MapSqlParameterSource(
                                mapOf(
                                        "type" to newWine.type,
                                        "producer" to newWine.producer,
                                        "year" to newWine.year,
                                        "quantity" to newWine.quantity,
                                        "country" to newWine.country,
                                        "cellar_location" to newWine.cellarLocation,
                                        "original_wooden_case" to newWine.originalWoodenCase,
                                        "bottle_size" to newWine.bottleSize,
                                        "notes" to newWine.notes
                                )
                        ), this)
                this.keys!!["id"] as Int
            }

    private fun mapSqlRowToWine(rs: ResultSet, @Suppress("UNUSED_PARAMETER") i: Int) =
            Wine(
                    type = rs.getString("type"),
                    producer = rs.getString("producer"),
                    year = rs.getInt("year"),
                    quantity = rs.getInt("quantity"),
                    country = rs.getString("country_name"),
                    id = rs.getInt("id"),
                    cellarLocation = rs.getString("cellar_location"),
                    notes = rs.getString("notes"),
                    originalWoodenCase = rs.getBoolean("original_wooden_case"),
                    bottleSize = rs.getInt("bottle_size")

            )

}