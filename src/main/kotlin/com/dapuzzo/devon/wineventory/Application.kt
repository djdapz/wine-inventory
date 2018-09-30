package com.dapuzzo.devon.wineventory

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.config.CorsRegistry
import org.springframework.web.reactive.config.WebFluxConfigurer
import org.springframework.web.reactive.config.EnableWebFlux





@SpringBootApplication
open class WinenventoryApplication{
    companion object{
        @JvmStatic
        fun main(args: Array<String>) {
            SpringApplication.run(WinenventoryApplication::class.java, *args)
        }
    }
}

@Configuration
@EnableWebFlux
open class CorsGlobalConfiguration : WebFluxConfigurer {

    override fun addCorsMappings(corsRegistry: CorsRegistry?) {
        corsRegistry!!.addMapping("/**")
//                .allowedOrigins("http://allowed-origin.com")
//                .allowedMethods("PUT")
//                .maxAge(3600)
    }
}