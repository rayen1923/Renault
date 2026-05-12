import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: "http://localhost:8081",
  realm: "renault-realm",
  clientId: "renault-client",
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;