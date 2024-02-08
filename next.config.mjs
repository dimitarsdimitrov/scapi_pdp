/** @type {import('next').NextConfig} */

const nextConfig = {
    async redirects() {
    return [{
              source: '/list',
              destination: '/',
              permanent: true,
        }]
    },
    reactStrictMode: true,
    images: {
      remotePatterns: [{
           protocol: 'https',
           hostname: 'zzrl-059.dx.commercecloud.salesforce.com',
           port: ''
          },{
            protocol: 'https',
            hostname: 'edge.disstg.commercecloud.salesforce.com',
            port: '',
           }]
    }
}

export default nextConfig;
