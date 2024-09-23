/// <reference types="vite/client" />

  interface ImportMetaEnv {
    readonly VITE_GEO_CODING_API: string;
    readonly VITE_WEATHER_API: string;
    // Add other environment variables as needed
  }

interface ImportMeta {
    readonly env: ImportMetaEnv;
  }