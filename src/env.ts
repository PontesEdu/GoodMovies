import { z } from 'zod'

export const envSchema = z.object({
  VITE_API_URL: z.string(),
  VITE_TMDB_KEY: z.string(),
  VITE_TMDB_TOKEN: z.string(),
})

export const env = envSchema.parse(import.meta.env)
