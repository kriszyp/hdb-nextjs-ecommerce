/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
  eslint: { ignoreDuringBuilds: true, },
  images: { unoptimized: true },
	experimental: {
		serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
	},
  webpack: (config) => {
		config.externals.push({
			harperdb: 'commonjs harperdb',
		});

    config.resolve.alias = {
			...config.resolve.alias,
			"sharp$": false,
			"onnxruntime-node$": false,
		};

		return config;
	},
};

module.exports = nextConfig;
