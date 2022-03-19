export function validateKeyboardLayout(englayout: string, thalayout: string) {
    const validThaLayout = ['Manoonchai', 'Kedmanee']
    const validEngLayout = ['QWERTY', 'Dvorak']
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

export default { validateKeyboardLayout }