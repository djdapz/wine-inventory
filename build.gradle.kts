import org.gradle.internal.impldep.org.junit.experimental.categories.Categories.CategoryFilter.exclude
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

val kotlinVersion = "1.2.51"
val springBootVersion = "2.0.4.RELEASE"

plugins {
    kotlin("jvm") version "1.2.51"
}

version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {

    compile(kotlin("stdlib-jdk8"))
    compile("com.fasterxml.jackson.datatype:jackson-datatype-jsr310:2.9.2")
    compile("com.fasterxml.jackson.module:jackson-module-kotlin:2.9.0")
    compile("com.fasterxml.jackson.core:jackson-core:2.9.2")
    compile("commons-validator:commons-validator:1.4.0")
    compile("org.flywaydb:flyway-core:4.1.0")
    compile("org.postgresql:postgresql:9.4.1212.jre7")
    compile("org.springframework.boot:spring-boot-starter-jdbc:$springBootVersion")
    compile("org.springframework.boot:spring-boot-starter-webflux:$springBootVersion")

    testCompile("com.nhaarman:mockito-kotlin-kt1.1:1.5.0")
    testCompile("io.rest-assured:rest-assured:3.0.5")
    testCompile("org.jetbrains.kotlin:kotlin-test")
    testCompile("org.jetbrains.kotlin:kotlin-test-junit")
    testCompile("com.github.javafaker:javafaker:0.14")

    testCompile("org.springframework.boot:spring-boot-starter-test:$springBootVersion") {
        exclude(module = "commons-logging")
    }
}

tasks.withType<KotlinCompile> {
    kotlinOptions.jvmTarget = "1.8"
}