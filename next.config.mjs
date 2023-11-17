/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'codeforces.com', },
            { protocol: 'https', hostname: 'user-images.githubusercontent.com', },
            { protocol: 'https', hostname: 'cdn.sparkfun.com', },
        ],
    },
}

export default nextConfig
