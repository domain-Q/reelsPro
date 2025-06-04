import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  remotePatterns :[{
    protocol:"https",
    hostname: "ik.imagekit.io",
    port :"3000"

}]
};

export default nextConfig;
