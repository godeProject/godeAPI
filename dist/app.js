"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gode_js_1 = __importDefault(require("gode.js"));
const app = (0, express_1.default)();
const port = 3000;
function validateKeyboardLayout(englayout, thalayout) {
    const validThaLayout = ['Manoonchai', 'Kedmanee'];
    const validEngLayout = ['QWERTY'];
    let isThaValid = false;
    let isEngValid = false;
    if (validThaLayout.includes(thalayout)) {
        isThaValid = true;
    }
    if (validEngLayout.includes(englayout)) {
        isEngValid = true;
    }
    return {
        isThaValid: isThaValid,
        isEngValid: isEngValid
    };
}
app.get('/', (req, res) => {
    res.redirect('https://github.com/godeProject/godeAPI');
});
app.get('/v1/getans/', (req, res) => {
    try {
        let message = req.query.phrase;
        let ans = gode_js_1.default.qwkm(message);
        res.json({
            'status': 200,
            'results': ans
        });
    }
    catch (_a) {
        if (!req.query.phrase) {
            res.json({
                'status': 400,
                'Error': 'Missing Argument'
            });
        }
        else {
            res.json({
                'status': 500,
                'Error': 'Internal Server Error'
            });
        }
    }
});
app.get('/v2/convert/englayout/:englayout/thalayout/:thalayout/', (req, res) => {
    try {
        let parameter = req.params;
        let validity = validateKeyboardLayout(parameter.englayout, parameter.thalayout);
        let tl = parameter.thalayout;
        let el = parameter.englayout;
        let message = req.query.message;
        if (validity.isEngValid && validity.isThaValid) {
            let ans = gode_js_1.default.convert(el, tl, message);
            res.json({
                'status': 200,
                'results': ans
            });
        }
        else {
            res.json({
                'status': 400,
                'Error': 'Bad Request'
            });
        }
    }
    catch (_a) {
        if (!req.params || !req.query.message) {
            res.json({
                'status': 400,
                'Error': 'Missing Argument'
            });
        }
        else {
            res.json({
                'status': 500,
                'Error': 'Internal Server Error'
            });
        }
    }
});
app.listen(port, () => {
    console.log(`Api listening on port ${port}`);
});
