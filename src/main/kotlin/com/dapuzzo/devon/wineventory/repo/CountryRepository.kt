package com.dapuzzo.devon.wineventory.repo

import com.dapuzzo.devon.wineventory.domain.CountryReader
import com.dapuzzo.devon.wineventory.web.Country
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.stereotype.Component
import java.sql.ResultSet

@Component
class CountryRepository(jdbcTemplate: JdbcTemplate) : CountryReader {
    private val db = NamedParameterJdbcTemplate(jdbcTemplate)

    override fun getAll(): List<Country> =
            db.query("""
            SELECT * FROM country
        """.trimIndent()) { rs: ResultSet, _: Int ->
    Country(
            code = rs.getString("country_code"),
            name = rs.getString("country_name")
    )
}

    override fun getTop5(): List<Country> {
        return db.query(
                //language=sql
                """
                   select c.country_code, c.country_name, count(*)
                    from country as c
                    JOIN wines as w
                    ON w.country_code=c.country_code
                    GROUP BY c.country_code
                    ORDER BY count DESC
                    LIMIT 5
                """.trimIndent()) { rs: ResultSet, _: Int ->
            Country(
                    code = rs.getString("country_code"),
                    name = rs.getString("country_name")
            )
        }
    }

}