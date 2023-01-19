/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  images: {
    domains: [process.env.CLOUDFRONT_DOMAIN],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
