/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: "top-right"
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
};

export default nextConfig;
