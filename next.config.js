const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 's.gravatar.com', 'unsplash.com']
  },
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "graphql-tag/loader",
          options: options,
        },
      ],
    })

    return config
  },
  productionBrowserSourceMaps: true,
}

module.exports = nextConfig
