import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export สำหรับ Cloudflare Pages — prototype phase ใช้ client-side ล้วน
  // เมื่อเริ่มใช้ Supabase/LINE API จริง ต้องย้ายไป @cloudflare/next-on-pages adapter
  output: "export",

  // Cloudflare Pages serve ทุก path เป็น folder; trailingSlash ทำให้ /foo → /foo/index.html
  trailingSlash: true,

  // ไม่มี next/image แต่กันไว้ก่อน — ถ้าใช้ในอนาคต static export ต้อง unoptimized
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
