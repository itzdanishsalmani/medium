import { Hono, Context } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlog,updateBlog } from "@danishsalmani/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
  }
}>()

blogRouter.use("/*", async (c: Context, next) => {
  const authHeader = c.req.header("authorization") || "";

  const token = authHeader.split(' ')[1];

  const user = await verify(token, c.env.JWT_SECRET);

  if (user) {
    c.set("userId", user.id);
    await next();

  } else {
    c.status(403);
    return c.json({
      error: "Unauthorized"
    })
  }
})

blogRouter.post('/', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const authorId = c.get("userId")
  const body = await c.req.json();
  const { success } = createBlog.safeParse(body);

  if (!success) {
    c.status(403);
    return c.json({
      error: "Fields cannot be empty"
    })
  }

  try {
    const blog = await prisma.post.create({

      data: {
        title: body.title,
        content: body.content,
        authorId: authorId
      },
    })
    return c.json({
      id: blog.id
    })

  } catch (error) {
    c.status(500);
    return c.json({
      error: "Internal Server error"
    })
  }
})

blogRouter.put('/', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const { success } = updateBlog.safeParse(body);

  if (!success) {
    c.status(403);
    return c.json({
      error: "Fields cannot be empty"
    })
  }

  try {
    const blog = await prisma.post.update({
      where: {
        id: body.id
      },

      data: {
        title: body.title,
        content: body.content,
      },
    })
    return c.json({
      id: blog.id
    })

  } catch (error) {
    c.status(403);
    return c.json({
      error: "Internal Server error"
    })
  }
})

blogRouter.get('/bulk', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blogs = await prisma.post.findMany();

  try {
    if (!blogs) {
      c.status(403);
      return c.json({
        error:"some error while fetching blogs"
      })
    }else{
      return c.json({
        blogs
      })
    }

  } catch {
    return c.json({
      error: "Internal server error"
    })
  }
})

blogRouter.get('/:id', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const id = c.req.param("id");

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id
      }
    })
    return c.json({
      blog
    })

  } catch (error) {
    c.status(403);
    return c.json({
      error
    })
  }
})