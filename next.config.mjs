/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'static.tvmaze.com',
            port: '',
            pathname: '/uploads/images/**',
          },
          {
            protocol: 'https',
            hostname: 'cdn.discordapp.com',
            port: '',
            pathname: '/avatars/**',
          },
        ],
      },
};

export default nextConfig;
