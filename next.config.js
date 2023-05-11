/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.wgsl$/i,
      use: "raw-loader",
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        __SOURCE__: webpack.DefinePlugin.runtimeValue((v) => {
          // Load the source file and set it as a global definition.
          // This is useful for easily embedding a file's source into the page.
          const source = fs.readFileSync(v.module.userRequest, "utf-8");
          return JSON.stringify(source); // Strings need to be wrapped in quotes
        }, []),
      })
    );

    if (!config.node) {
      config.node = {};
    }

    config.node.__filename = true;
    config.node.__dirname = true;

    return config;
  },
};

module.exports = nextConfig;
