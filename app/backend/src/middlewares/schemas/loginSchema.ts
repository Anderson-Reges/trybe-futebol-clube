import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email or password' }),
  password: z.string().min(6, { message: 'Invalid email or password' }),
});

export default loginSchema;
