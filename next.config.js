const nextConfig = {
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi', 'en'],
    localeDetection: false,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  reactStrictMode: true,
  async rewrites() {
    return {
      fallback: [],
    };
  },
};

module.exports = nextConfig;
