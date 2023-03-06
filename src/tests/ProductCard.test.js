import { render, screen } from "@testing-library/react"
import  userEvent  from "@testing-library/user-event"
import ProductCard from "../components/ProductsList/ProductCard"


const productMock = {
    id: 1,
    image: "htpps://imagem.png",
    title: "Produto teste",
    price: 1000
}

const addToCartMock = jest.fn()


describe("Product Card", ()=>{
    test("testar renderizar card", ()=>{

        render(<ProductCard product={productMock} addToCart={addToCartMock}/>)

        const card = screen.getByText("Produto teste")
        expect(card).toBeInTheDocument()
    })

    test("testar renderização do titulo, imagem, preço e botão de compra", ()=>{

        render(<ProductCard product={productMock} addToCart={addToCartMock}/>)

        const title = screen.getByRole('heading', { name: /produto teste/i })
        const imagem = screen.getByRole('img', { name: /produto teste/i })
        const price = screen.getByText(/\$1000\.00/i)
        const addBtn = screen.getByRole('button', { name: /buy/i })
        screen.logTestingPlaygroundURL()

        expect(title).toBeInTheDocument()
        expect(imagem).toBeInTheDocument()
        expect(price).toBeInTheDocument()
        expect(addBtn).toBeInTheDocument()
    })

    test("testar click do botão", async ()=>{

        const user = userEvent.setup()

        render(<ProductCard product={productMock} addToCart={addToCartMock}/>)

        const addBtn = screen.getByRole('button', { name: /buy/i })

        await user.click(addBtn)

        expect(addToCartMock).toBeCalled()

        expect(addToCartMock).toBeCalledTimes(1)

        expect(addToCartMock).toBeCalledWith(productMock)


    })



})