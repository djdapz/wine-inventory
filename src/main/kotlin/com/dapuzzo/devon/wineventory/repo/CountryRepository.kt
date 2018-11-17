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

    override fun getAll(): Collection<Country> =
            db.query("""
                SELECT * FROM country
            """.trimIndent()) { rs: ResultSet, _: Int ->
                Country(
                        code = rs.getString("country_code"),
                        name = rs.getString("country_name")
                )
            }

}