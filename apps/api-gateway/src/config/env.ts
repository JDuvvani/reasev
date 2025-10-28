import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
  PORT: z.string().transform(Number),
  AUTH_SERVICE_URL: z.url(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid ENV', z.treeifyError(parsed.error).properties);
  process.exit(1);
}

export const env = parsed.data;
