#!/usr/bin/env bash

set -e

pushd repo
    ./gradlew clean test
popd