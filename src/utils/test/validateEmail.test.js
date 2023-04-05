import { validateEmail } from "../general";

describe("validateEmail", () => {
    test("validateEmail is not email", () => {
        const email =""
        const isEmail= validateEmail(email)
        expect(isEmail).toBe("Email invalid")
    });

    test("validateEmail", () => {
        const email =" este es un texto"
        const isEmail= validateEmail(email)
        expect(isEmail).toBe("Email invalid")
    })
})

describe("validateEmail", () => {
    test("validateEmail is  email", () => {
        const email ="lucas@gmail.com"
        const isEmail= validateEmail(email)
        expect(isEmail).toBe(true)
    });

    test("validateEmail", () => {
        const email ="correoCorporativo@empresa.com.co"
        const isEmail= validateEmail(email)
        expect(isEmail).toBe(true)
    })
})