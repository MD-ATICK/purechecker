/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    if (isDev) {
      // No redirects in development
      return [];
    }
    return [
      {
        source: "/:path*",
        destination: "https://purechecker.com/:path*",
        permanent: true,
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
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
