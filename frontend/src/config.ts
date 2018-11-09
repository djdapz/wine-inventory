enum EnvironmentName {
    DEV = "DEV",
    E2E = "E2E",
    DEVELOPMENT_PCF="DEVELOPMENT_PCF"
}

const environment: EnvironmentName = function () {
    switch (window.location.origin) {
        case("http://localhost:3000"):
            return EnvironmentName.DEV;
        case("http://localhost:3210"):
            return EnvironmentName.E2E;
        case("https://wine-inventory-acceptance.cfapps.io"):
            return EnvironmentName.DEVELOPMENT_PCF;
        default:
            return EnvironmentName.E2E
    }
}();


const backendUriMap = {
    [EnvironmentName.DEV]: "http://localhost:8081",
    [EnvironmentName.E2E]: "http://localhost:3210",
    [EnvironmentName.DEVELOPMENT_PCF]: "https://wine-inventory-backend-acceptance.cfapps.io"
};

export const backendUri = backendUriMap[environment];