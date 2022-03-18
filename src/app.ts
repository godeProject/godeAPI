import express, { Request, Response } from 'express'
import gode, { EngLayout, ThaLayout } from 'gode.js'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors())

function validateKeyboardLayout(englayout: string, thalayout: string) {
    const validThaLayout = ['Manoonchai', 'Kedmanee']
    const validEngLayout = ['QWERTY']
    let isThaValid = false
    let isEngValid = false
    if (validThaLayout.includes(thalayout)) {
        isThaValid = true
    }
    if (validEngLayout.includes(englayout)) {
        isEngValid = true
    }
    return {
        isThaValid: isThaValid,
        isEngValid: isEngValid
    }
}

app.get('/', (req: Request, res: Response) => {
    res.redirect('https://github.com/godeProject/godeAPI')
})

app.get('/v1/getans/', (req: Request, res: Response) => {
    try {
        let message = req.query.phrase as string
        let ans = gode.qwkm(message)
        res.json({
            'status': 200,
            'results': ans
        })
    }
    catch {
        if (!req.query.phrase) {
            res.json({
                'status': 400,
                'Error': 'Missing Argument'
            })
        }
        else {
            res.json({
                'status': 500,
                'Error': 'Internal Server Error'
            })
        }
    }

})

app.get('/v2/convert/englayout/:englayout/thalayout/:thalayout/', (req: Request, res: Response) => {
    try {
        let parameter = req.params
        let validity = validateKeyboardLayout(parameter.englayout as string, parameter.thalayout as string)
        let tl: unknown = parameter.thalayout
        let el: unknown = parameter.englayout
        let message: unknown = req.query.message
        if (validity.isEngValid && validity.isThaValid) {
            let ans = gode.convert(el as EngLayout, tl as ThaLayout, message as string)
            res.json({
                'status': 200,
                'results': ans
            })
        }
        else {
            res.json({
                'status': 400,
                'Error': 'Bad Request'
            })
        }

    }
    catch {
        if (!req.params || !req.query.message) {
            res.json({
                'status': 400,
                'Error': 'Missing Argument'
            })
        }
        else {
            res.json({
                'status': 500,
                'Error': 'Internal Server Error'
            })
        }
    }

})



app.listen(port, () => {
    console.log(`Api listening on port ${port}`)
})