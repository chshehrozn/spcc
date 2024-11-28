/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["media.imgcdn.org", "admin.spaxpc.com", "spaxpc.com"],
  },
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/:path*",
  //       has: [{ type: "host", value: "www.sgetintopc.com" }],
  //       destination: "/:path*/",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
