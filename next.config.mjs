/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'codeforces.com',
                port: '',
            },
        ],
    },
}

export default nextConfig
