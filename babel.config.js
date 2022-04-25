module.exports = {
  presets: [
    "@babel/preset-env", // compiles your js according
    "@babel/preset-typescript", // allows  to use TypeScript
    ["@babel/preset-react", {
      "runtime": "automatic"
    }], // optional: react: this resolves react-files (jsx, tsx)
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties', // transforms static class properties as well as properties declared with the property initializer syntax
  ]
}