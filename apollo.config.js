module.exports = {
  client: {
    // service: {
    //   name: "github",
    //   localSchemaFile: "./src/generated/introspection.json",
    // },
    // excludes: ["./src/**/*.ts"],
    clientOnlyDirectives: ["connection", "type"],
    clientSchemaDirectives: ["client", "rest"],
    includes: ["./src/**/*.vue", "./src/client.ts"],
  },
};
