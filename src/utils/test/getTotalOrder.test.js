import { getTotalOrder } from "../general";

describe("getTotalOrder", () => {
    test("getTotalOrder is array", () => {
        const data =[
            {
                "price": "$ 24.45",
                "totalOrder": "$ 24.45",
                "photo": "https://res.cloudinary.com/drpc7v6x8/image/upload/v1680492810/restaurants/plates/salad-1_ma7zf4.png",
                "name": "Bolognese salad",
                "id": 1,
                "cant": 1
            },
            {
                "cant": 1,
                "totalOrder": "$ 14.45",
                "name": "Bolognese salad",
                "photo": "https://res.cloudinary.com/drpc7v6x8/image/upload/v1680492810/restaurants/plates/salad-1_ma7zf4.png",
                "id": 2,
                "price": "$ 14.45"
            }
        ]

        const total= getTotalOrder(data)
        expect(total).toBe("38.90")
    });

    test("getTotalOrder", () => {
        const data =" este es un texto"
        const total= getTotalOrder(data)
        expect(total).toBe(undefined)
    })
})

describe("getTotalOrder  is no Array", () => {
    test("getTotalOrder", () => {
        const data =" este es un texto"
        const total= getTotalOrder(data)
        expect(total).toBe(undefined)
    })
})