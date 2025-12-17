/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isProxied = process.env.USE_PROXY === 'true';

const nextConfig = {
    reactStrictMode: false,
    basePath: (isProd || isProxied) ? '/responsive_forms' : '',
    assetPrefix: (isProd || isProxied) ? '/responsive_forms' : '',
};

export default nextConfig;