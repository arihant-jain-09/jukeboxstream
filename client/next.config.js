/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  images: {
    domains: [process.env.CLOUDFRONT_DOMAIN],
  },
  webpack(config, { webpack, isServer, nextRuntime }) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    if (isServer && nextRuntime === 'nodejs')
      config.plugins.push(
        new webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ })
      );
    return config;
  },
};
