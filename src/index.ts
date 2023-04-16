import { Hono } from 'hono'

import { statusCodes } from './statusCodes'

const app = new Hono({ strict: false })

app.get('/:code', (c) => {
  const allCodes: Map<number, string> = new Map(statusCodes)
  // the URL param is a string, but the Map key is a number
  let statusCode: number | any = parseInt(c.req.param('code'))
  if (allCodes.has(statusCode)) {
    c.header('Content-Type', 'text/plain')
    return c.text(`${statusCode} ${allCodes.get(statusCode)}`, statusCode)
  }
  // 302 redirect since incorrect paths will be arbitrary
  return c.redirect('https://about.statuscodes.org', 302)
})

// 301 redirect for SEO when hitting the naked domain
app.get('/', (c) => c.redirect('https://about.statuscodes.org', 301))

export default app
