#!/usr/bin/env bash

set -e

export DB_URL="jdbc:postgresql://test-db:5432/test?user=user&password=pwd"
export DB_USERNAME=user
export DB_PASSWORD=pwd

pushd repo
    ./gradlew clean test
popd