/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'lh3.googleusercontent.com',
            'images8.alphacoders.com'
        ]
    },
    experimental: {
        serverComponentsExternalPackages: ['graphql-request']
    }
}

module.exports = nextConfig
