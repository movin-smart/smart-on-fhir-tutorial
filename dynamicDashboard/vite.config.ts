import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	// base: 'smart-on-fhir-tutorial/example-smart-app/dist/', // Set the base URL for asset loading
  plugins: [react()],
})