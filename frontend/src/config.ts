enum EnvironmentName {
    DEV = "DEV",
    E2E = "E2E",
    LOCAL_SERVER = "LOCAL_SERVER",
    SOME_SERVER = "SOME_SERVER",
}

const environment: EnvironmentName = function () {
    switch (window.location.host) {
        case("localhost:3000"):
            return EnvironmentName.DEV;
        case("localhost:3210"):
            return EnvironmentName.E2E;
        case("localhost:8081"):
            return EnvironmentName.LOCAL_SERVER;
        default:
            return EnvironmentName.SOME_SERVER;
    }
}();


const backendUriMap = {
    [EnvironmentName.DEV]: "http://localhost:8081",
    [EnvironmentName.E2E]: "http://localhost:3210",
    [EnvironmentName.LOCAL_SERVER]: "http://localhost:8081",
    [EnvironmentName.SOME_SERVER]: "",
};

export const backendUri = backendUriMap[environment];