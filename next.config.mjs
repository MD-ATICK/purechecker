/** @type {import('next').NextConfig} */
const nextConfig = {
  async Headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              script-src 'self' https://core.spreedly.com https://global.localizecdn.com https://js.stripe.com https://sandbox-checkout-service.paddle.com;
              connect-src 'self' https://sandbox-checkout-service.paddle.com;
            `.replace(/\n/g, ""), // Minify for browser compatibility
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
