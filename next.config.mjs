/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns:
        {
        domains: ['edge.disstg.commercecloud.salesforce.com', 'zzrl-059.dx.commercecloud.salesforce.com']
        }
    }
  }
  

export default nextConfig;
