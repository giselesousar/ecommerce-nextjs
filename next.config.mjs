/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/products",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["fakestoreapi.com"],
  },
};

export default nextConfig;
