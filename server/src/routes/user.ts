import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupSchema, signinSchema } from "@danishsalmani/medium-common"

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

userRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const { success } = signupSchema.safeParse(body);

    if (!success) {
        return c.json({
            error: "Inputs cannot be empty"
        })
    }

    try {
        const userExist = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })

        if (userExist) {
            c.status(403);
            return c.json({ error: "User exist" })
        } else {
            const user = await prisma.user.create({
                data: {
                    name: body.name,
                    email: body.email,
                    password: body.password
                },
            });
            const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
            return c.json({ jwt });
        }
    }
    catch (e) {
        console.log(e)
        c.status(403);
        return c.json({ error: "error while signing up" });
    }
})

userRouter.post('/signin', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = signinSchema.safeParse(body);

    if (!success) {
        c.status(403);
        return c.json({
            error: "Inputs cannot be empty"
        })
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            },
        })

        if (!user) {
            c.status(404);
            return c.json({
                error: "user not found"
            })
        }
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt })

    } catch (error) {
        c.status(500);
        return c.json({ error })
    }
})