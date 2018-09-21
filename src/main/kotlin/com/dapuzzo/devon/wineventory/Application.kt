package com.dapuzzo.devon.wineventory

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
open class WinenventoryApplication{
    companion object{
        @JvmStatic
        fun main(args: Array<String>) {
            SpringApplication.run(WinenventoryApplication::class.java, *args)
        }
    }
}