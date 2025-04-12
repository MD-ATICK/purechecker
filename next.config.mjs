/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "utfs.io",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "uploadthing.com",
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
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.fallback.fs = false;
		}
		return config;
	},
};

export default nextConfig;
