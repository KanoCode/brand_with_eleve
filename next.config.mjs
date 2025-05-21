/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "false" },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://markethub--markethub-cce4f.asia-east1.hosted.app",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://brandwithmarkethub.com",
          },

          // uncomment for localhost only
          /*  {
             key: "Access-Control-Allow-Origin",
             value: "http:localhost:3000",
           },

          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:5000",
          },*/
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date",
          },

          // {
          //   key: "Cache-Control",
          //   value: "public, max-age=2592000, must-revalidate", // Cache for 30 days
          // },
        ],
      },
    ];
  },

  env: {
    AMROD_SERVER_URL: "https://identity.amrod.co.za",
    AMROD_API_URL: "https://vendorapi.amrod.co.za",
    AMROD_USERNAME: "sales.markethub.zm@gmail.com",
    AMROD_PASSWORD: "Acare91191!",
    AMROD_CUSTOMER_CODER: "025428",
    RESEND_EMAILS_KEY: "re_Ns1RZcJZ_5Q5ndNZeueGtyxS6oMRmnnry",
    // production
    UPSTASH_REDIS_REST_TOKEN:
      "AcmhAAIjcDEzM2M2YjkyOTM0Mjg0MDhjYmVlMzZhODc1NzA0MDE4Y3AxMA",
    UPSTASH_REDIS_REST_URL: "https://witty-lemming-51617.upstash.io",
    NEXT_FIREBASE_API_KEY: "AIzaSyCsW5E265UkxCHIMT0Ypuj9Z6fTmi6vQog",
    NEXT_FIREBASE_AUTH_DOMAIN: "markethub-cce4f.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "markethub-cce4f",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "gs://markethub-cce4f.appspot.com",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "327813567074",
    NEXT_PUBLIC_FIREBASE_APP_ID: "1:327813567074:web:f1543f70acbc1a538d373b",
    NEXT_RESEND_API_KEY: "re_NrDvDdaA_KsJmpeCwYrrr9CrMVddnB7ym",
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: "G-VX454WXPQD",
    NEXT_PUBLIC_URL:
      "https://markethub--markethub-cce4f.asia-east1.hosted.app/",
    NEXT_PUBLIC_BASE_API_URL:
      "https://markethub--markethub-cce4f.asia-east1.hosted.app/",
    MARKETHUB_NODE_URL: "https://markethub-cce4f.uc.r.appspot.com",
    CLIENT_ID:
      "327813567074-l94mqp0fflje77ad1l8a9hjdg49fqvv4.apps.googleusercontent.com",
    CLIENT_SECRET: "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",
    REDIRECT_URL:
      "https://markethub--markethub-cce4f.asia-east1.hosted.app/auth/redirect",
    //local server
    // NEXT_PUBLIC_URL: "http://localhost:3000",

    // NEXT_PUBLIC_BASE_API_URL: "http://localhost:3000",
    // MARKETHUB_NODE_URL: "http://localhost:5000",

  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/auth/login",
        permanent: true,
      },
    ];
  },//
  //
  //

  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }]; // required for the canvas to work
    return config;
  },
};

export default nextConfig;
