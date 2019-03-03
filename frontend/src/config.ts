enum EnvironmentName {
    DEV = "DEV",
    E2E = "E2E",
    DEVELOPMENT_PCF="DEVELOPMENT_PCF",
    PROD="PROD",
}

const environment: EnvironmentName = function () {
    switch (window.location.host) {
        case("localhost:3000"):
            return EnvironmentName.DEV;
        case("localhost:3210"):
            return EnvironmentName.E2E;
        case("wine-inventory-acceptance.cfapps.io"):
            return EnvironmentName.DEVELOPMENT_PCF;
        case("wine-inventory.cfapps.io"):
            return EnvironmentName.PROD;
        default:
            return EnvironmentName.E2E
    }
}();


const backendUriMap = {
    [EnvironmentName.DEV]: "http://localhost:8081",
    [EnvironmentName.E2E]: "http://localhost:3210",
    [EnvironmentName.DEVELOPMENT_PCF]: "https://wine-inventory-backend-acceptance.cfapps.io",
    [EnvironmentName.PROD]: "https://wine-inventory-backend-prod.cfapps.io"
};

export const backendUri = backendUriMap[environment];