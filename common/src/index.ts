import z from "zod";

export const signupSchema = z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(6,{ message:"Password must be at least 6 characters"}),
})

export const signinSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6,{ message:"Password must be at least 6 characters"}),
})

export const createBlog = z.object({
    title:z.string(),
    content:z.string(),
})

export const updateBlog = z.object({
    title:z.string(),
    content:z.string(),
    id:z.string()
})

export type SignupSchema = z.infer<typeof signupSchema>
export type SigninSchema = z.infer<typeof signinSchema>
export type CreateBlog = z.infer<typeof createBlog>
export type UpdateBlog = z.infer<typeof updateBlog>
