#!/usr/bin/env bash

pushd repo
    ./gradlew clean test
popd