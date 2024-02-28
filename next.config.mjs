/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/v1/:path*', // Removed protocol and adjusted wildcard
                destination: 'http://13.60.12.139:3000/v1/:path*', // Adjusted destination with the correct base URL
            },
        ]
    },
};

export default nextConfig;
