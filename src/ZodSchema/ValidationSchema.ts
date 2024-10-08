import {z} from 'zod';

export const SignupSchema: z.ZodSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email({message:"Invalid email address"}),
  password: z.string().min(5,{message:"Password must be atleast 5 character"}),
})

export const verifySchema : z.ZodSchema = z.object({
  verifyCode : z.string().length(6,"validation code must be 6 digits")
})

export const SigninSchema : z.ZodSchema = z.object({
  email: z.string().email({message:"Invalid email address"}),
  password: z.string().min(5,{message:"Password must be atleast 5 character"}),
})

export const UsernameSchema :z.ZodSchema = z.object({
  username:z.string().min(3).max(20)
})

export const UpdateSchema : z.ZodSchema = z.object({
  name:z.string().min(2).max(20).optional(),
  username:z.string().min(3).max(20).optional(),
  bio:z.string().max(150).optional()
})

export const emailSchema :z.ZodSchema = z.object({
  email: z.string().email({message:"Invalid email address"}),
})