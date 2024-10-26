/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "abpoowyhcrewackbsrvh.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  // for static site or building the appplication an dhost it on vercel or CDN
  // output: "export",
};

export default nextConfig;
