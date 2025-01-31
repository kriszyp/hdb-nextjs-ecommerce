/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config) => {
		config.externals.push({
			harperdb: 'commonjs harperdb',
		});

		return config;
	},
};

module.exports = nextConfig;
