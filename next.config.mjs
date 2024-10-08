/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ["mongoose"],
		mdxRs: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*",
			},
		],
	},
};

export default nextConfig;
