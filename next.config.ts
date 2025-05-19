// next.config.js
import MiniCssExtractPlugin from "mini-css-extract-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (
    config: {
      plugins: unknown[];
      images: {
        domains: ["openweathermap.org"];
      };
    },
    { isServer }: { isServer: boolean }
  ) => {
    if (!isServer) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: "static/css/[name].[contenthash:8].css",
          chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
        })
      );
    }

    return config;
  },

  images: {
    domains: ["openweathermap.org"],
  },
};

module.exports = nextConfig;
