import { z } from 'zod';

// Predefined enums
export const TIER_OPTIONS = ['Free', 'Pro', 'Enterprise'] as const;

export const registrationSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters long.' })
      .max(20, { message: 'Username cannot exceed 20 characters.' })
      .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores allowed.'),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
      .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
      .regex(/[0-9]/, { message: 'Password must contain at least one number.' }),
    confirmPassword: z.string(),
    age: z.number()
      .min(18, { message: 'You must be at least 18 years old.' })
      .max(120, { message: 'Age cannot exceed 120 years.' }),
    tier: z.enum(TIER_OPTIONS),
    address: z.object({
      street: z.string().min(1, 'Street address is required.'),
      city: z.string().min(1, 'City is required.'),
      zipCode: z.string().regex(/^\d{5}(?:[-\s]\d{4})?$/, 'Invalid zip code format.'),
    }),
    skills: z
      .array(
        z.object({
          name: z.string().min(1, 'Skill name cannot be empty.'),
          experience: z.number()
            .min(1, 'Must be at least 1 year.')
            .max(50, 'Cannot exceed 50 years.'),
        })
      )
      .min(1, 'Please add at least one skill.'),
    termsAccepted: z
      .boolean()
      .refine((val) => val === true, { message: 'You must accept the terms and conditions.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'], // path of error
  });

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
