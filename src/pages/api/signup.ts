// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
type SignUpResponse = {
  message: string
}
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignUpResponse>
) {
    if (req.method !== 'POST') {
      return res.status(405).send({ message: 'Only POST request are allowed' })
    }

    try {
      const user = await prisma.user.create({
        data: {
          name: req.body.username,
          email: req.body.email,
          password: req.body.password
        }
      })
      res.redirect
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "An error occured"})
    } finally {
      await prisma.$disconnect()
    }
    console.log(req.body)
  res.redirect('/api/auth/signin')
}
