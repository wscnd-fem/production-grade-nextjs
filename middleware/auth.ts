import jwt from 'next-auth/jwt'

export default async (req, res, next) => {
  const token = await jwt.getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NEXTAUTH_URL?.startsWith('https://') ?? process.env.VERCEL_ENV === 'preview',
  })

  if (token) {
    // Signed in
    req.user = token
    next()
  } else {
    // Not Signed in
    res.status(401)
    res.end()
  }
}
