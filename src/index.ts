import { Elysia, t } from "elysia"
import gode, { EngLayout, ThaLayout } from "gode.js"
import minimist from "minimist"

import utils from "./utils"

const argv = minimist(Bun.argv.slice(2))
const certPath = argv['cert']
const privKey = argv['key']

const port = argv['port'] || 3000

const app = new Elysia({
  serve: {
    cert: Bun.file(certPath),
    key: Bun.file(privKey),
  }
})

app.get('/', ({ set }) => {
  set.redirect = 'https://github.com/godeProject/godeAPI'
})

app.get('/v1/getans/', ({ query, set }) => {
  try {
      let ans = gode.qwkm(query.phrase as string)

      set.status = 200

      return {
          'status': 200,
          'original': query.phrase,
          'results': ans
      }
  }
  catch {
      if (!query.phrase) {
        set.status = 400
        return {
            'status': 400,
            'Error': 'Missing Argument'
        }
      }
      else {
        set.status = 500
        return {
            'status': 500,
            'Error': 'Internal Server Error'
        }
      }
  }

})

app.get('/v2/convert/:englayout/:thalayout/', ({ params, query, set }) => {
  try {
    let parameter = params
    let validity = utils.validateKeyboardLayout(parameter.englayout as string, parameter.thalayout as string)
    if (validity.isEngValid && validity.isThaValid) {
        let ans = gode.convert(parameter.englayout as EngLayout, parameter.thalayout as ThaLayout, query.message as string)
        set.status = 200
        return {
            'status': 200,
            'original': query.message as string,
            'results': ans
        }
    }
    else {
      set.status = 400
      return {
          'status': 400,
          'Error': 'Bad Request'
      }
    }

  }
  catch {
      if (!params || !query.message) {
        set.status = 400
        return {
            'status': 400,
            'Error': 'Missing Argument'
        }
      }
      else {
        set.status = 500
        return {
            'status': 500,
            'Error': 'Internal Server Error'
        }
      }
  }
})

app.post('/v2/raw/', ({ body, set }) => {
  try {
    let validity = utils.validateKeyboardLayout(body.engLayout as string, body.thaLayout as string)
    if (validity.isEngValid && validity.isThaValid) {
        let ans = gode.convert(body.engLayout as EngLayout, body.thaLayout as ThaLayout, body.message)
        set.status = 200
        return {
            'status': 200,
            'original': body.message,
            'results': ans
        }
    }
    else {
        let missingArgument: boolean = false
        let args: Array<string> = []
        if (!body.engLayout) {
            missingArgument = true
            args.push("engLayout")
        }
        if (!body.thaLayout) {
            missingArgument = true
            args.push("thaLayout")
        }
        if (!body.message) {
            missingArgument = true
            args.push("message")
        }
        if (!missingArgument) {
          set.status = 400
          return {
            'status': 400,
            'Error': 'Bad Request'
          }
        }
        else {
          set.status = 400
          return {
              'status': 400,
              'Error': `Missing following argument(s): ${args.join(', ')}`
          }
        }
    }
  }
  catch {
    if (!body) {
      set.status = 400
      return {
          'status': 400,
          'Error': 'Missing Body'
      }
    }
    else {
      set.status = 500
      return {
            'status': 500,
            'Error': 'Internal Server Error'
      }
    }
  }
}, { body: t.Object({ engLayout: t.String(), thaLayout: t.String(), message: t.String() })})

app.onError(({ code, path, request, error }) => {
  if (code === 'NOT_FOUND'){
    return new Response(JSON.stringify({ status: 404, Error: `Cannot find route ${request.method as string}: ${path as string} on this server.`}), { status: 404, headers: { 'Content-Type': 'application/json' }})
  }
  else if (code === 'INTERNAL_SERVER_ERROR') {
    return new Response(JSON.stringify({'status': 500, 'Error': 'Internal Server Error'}), { status: 500, headers: { 'Content-Type': 'application/json' }})
  }
})

if (certPath && privKey){
  app.listen(443)
  console.log("g;ode API Production Server are now running at port 443")
}
else {
  app.listen(port)
  console.log(`g;ode API Development environment are now running at port ${port}`)
}


