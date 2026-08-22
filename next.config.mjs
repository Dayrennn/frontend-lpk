/** @type {import('next').NextConfig} */
const nextConfig = {
    reactCompiler: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/ed98luqk/**', // sesuaikan cloud_name kamu
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`,
            },
        ];
    },
};

export default nextConfig;
