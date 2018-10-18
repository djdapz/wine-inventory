enum EnvironmentName {
    DEV = "DEV",
    E2E = "E2E"
}

const environment: EnvironmentName = function () {
    switch (window.location.origin) {
        case("http://localhost:3000"):
            return EnvironmentName.DEV;
        case("http://localhost:3210"):
            return EnvironmentName.E2E;
        default:
            return EnvironmentName.E2E
    }
}();


const backendUriMap = {
    [EnvironmentName.DEV]: "http://localhost:8080",
    [EnvironmentName.E2E]: "http://localhost:3210"
};

export const backendUri = backendUriMap[environment];