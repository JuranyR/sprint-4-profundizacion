import { getPrice } from "../general";

describe("getPrice is not null", () => {
    test("getPrice", () => {
        const price ="3.40"
        const newPrice= getPrice(price)
        expect(newPrice).toBe(3.40)
    });

    test("getPrice", () => {
        const price ="$ 5.60"
        const newPrice= getPrice(price)
        expect(newPrice).toBe(5.60)
    })
})

describe("getPrice", () => {
    test("getPrice is  null", () => {
        const price= getPrice()
        expect(price).toBe(undefined)
    });
})