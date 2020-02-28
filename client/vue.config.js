// Many of the configurations below aid in running webpack dev server behind another server (proxy)

const https = false; // set to true if app loads on a secured domain
const hostAndPort = "localhost:8080"; // a standard for all developers to use locally, do not change
let publicPath;

if (process.env.NODE_ENV === "development") {
  publicPath = https ? `https://${hostAndPort}/` : `http://${hostAndPort}/`; // fixes runtime require/chunks during development
} else {
  publicPath = "/"; // production build should use relative paths
}

module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: publicPath,
  filenameHashing: false, // file names will be static, may need to find other means of cache busting
  devServer: {
    disableHostCheck: true, // prevents sockjs-node loop issue
    https: https,
    public: hostAndPort, // fixes sockjs-node port issue
    headers: {
      "Access-Control-Allow-Origin": "*" // needed to push the hot update from server to client
    }
  }
};
