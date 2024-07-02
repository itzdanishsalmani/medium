import { Hono, Context } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupSchema, signinSchema } from "@danishsalmani/medium-common"
import { verify } from 'hono/jwt'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>()

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

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password
            },
        })

        if (!user) {
            c.status(404);
            return c.json({
                error: "User not found Please Signup"
            })
        }
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt })

    } catch (error) {
        c.status(500);
        return c.json({ error })
    }
})

userRouter.get('/me', async (c: Context) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const authHeader = c.req.header("authorization") || "";

    const token = authHeader.split(' ')[1];

    let user:any;
    try {
        user = await verify(token, c.env.JWT_SECRET);
    } catch (error) {
        c.status(403);
        return c.json({ error: "Invalid or expired token" });
    }

    const userId = user.id;

    try {
        const posts = await prisma.post.findMany({
            where: {
                authorId: userId,
            },
            select: {
                title: true,
                content: true,
                id: true,
            },
        });

        if (!posts) {
            c.status(404);
            return c.json({ error: "User not found" });
        }
        return c.json(posts);

    } catch (error:any) {
        c.status(500);
        return c.json({ error });
    }
});


