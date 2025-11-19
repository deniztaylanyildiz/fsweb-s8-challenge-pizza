import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // Uygulamanızın çalıştığı adresi burada tanımlıyoruz
    baseUrl: 'http://localhost:5173', 
    setupNodeEvents(on, config) {
      // Node olaylarını burada yapılandırabilirsiniz
    },
  },
});