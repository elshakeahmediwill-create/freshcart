/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // دي معناها اسمح بالصور من أي موقع في العالم
      },
    ],
  },
};

export default nextConfig;