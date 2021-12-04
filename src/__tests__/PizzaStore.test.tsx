import React from "react";
import { render } from "../setupTests";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../module/Home";

function setUpHome() {
    render(<Home />);
    const chooseButtons = screen.getAllByRole(/dialog-button/i);
    const imageButton = screen.getAllByRole(/dialog-image/i);
    const checkout = screen.getByRole("button", { name: /checkout/i });
    const empty = screen.getByRole("button", { name: /empty basket/i });

    return { chooseButtons, imageButton, checkout, empty };
}

async function setUpModal() {
    const { checkout, empty, chooseButtons } = setUpHome();
    await userEvent.click(chooseButtons[0]);

    const addToBasket = screen.getByRole("button", { name: /add to basket/i });
    const cancel = screen.getByRole("button", { name: /cancel/i });
    const toppingBoxes = screen.getAllByRole("checkbox", { name: /pizza topping #/i });
    const sizeRadio = screen.getByRole("radio", { name: /pizza size #1/i });

    return {
        chooseButtons,
        addToBasket,
        cancel,
        toppingBoxes,
        sizeRadio,
        checkout,
        empty,
    };
}

async function setUpOrder() {
    const { chooseButtons, checkout, empty, toppingBoxes, addToBasket } = await setUpModal();
    await userEvent.click(toppingBoxes[0]);
    await userEvent.click(addToBasket);
    return { chooseButtons, toppingBoxes, addToBasket, checkout, empty };
}

describe("PizzaStore", () => {
    test("should be presented with a range of pizzas to choose from and a basket on page load", () => {
        const { chooseButtons, imageButton } = setUpHome();
        expect(chooseButtons.length).toBe(6);
        expect(chooseButtons[0]).toBeInTheDocument();
        expect(imageButton.length).toBe(6);
        expect(imageButton[0]).toBeInTheDocument();
    });

    test("should have checkout button disabled when basket is empty", () => {
        const { checkout, empty } = setUpHome();
        expect(checkout).toBeDisabled();
        expect(empty).toBeDisabled();
        const message = screen.getByText(/no items in your basket/i);
        expect(message).toBeInTheDocument();
    });

    test("should presented with a modal containing options to customise their pizza, including toppings and size when user clicks Choose", async () => {
        const { chooseButtons } = setUpHome();
        await userEvent.click(chooseButtons[0]);
        const topping = screen.getByText(/pizza topping #1/i);
        const size = screen.getByText(/pizza size #1/i);
        expect(topping).toBeInTheDocument();
        expect(size).toBeInTheDocument();

        const addToBasket = screen.getByRole("button", { name: /add to basket/i });
        const cancel = screen.getByRole("button", { name: /cancel/i });
        expect(addToBasket).toBeInTheDocument();
        expect(cancel).toBeInTheDocument();

        const toppingBox = screen.getByRole("checkbox", { name: /pizza topping #1/i });
        const sizeRadio = screen.getByRole("radio", { name: /pizza size #1/i });
        expect(toppingBox).toBeInTheDocument();
        expect(sizeRadio).toBeInTheDocument();
    });

    test("should close modal and pizza should be added to the basket, with its price and selected options when the user clicks on the Add to basket button", async () => {
        const { toppingBoxes, addToBasket } = await setUpModal();
        await userEvent.click(toppingBoxes[0]);
        await userEvent.click(addToBasket);

        expect(toppingBoxes[0]).not.toBeInTheDocument();
        expect(addToBasket).not.toBeInTheDocument();

        const orderName = screen.getByText(/1 x pizza name 1/i);
        const orderSummary = screen.getByText(/pizza size #1, pizza topping #1/i);
        expect(orderName).toBeInTheDocument();
        expect(orderSummary).toBeInTheDocument();

        const listitem = screen.getByRole("listitem");
        const orderPrice = within(listitem).getByText(/\$99/i);
        expect(orderPrice).toBeInTheDocument();
    });

    test("should calculate the basket total and show the selected options", async () => {
        const { checkout, empty } = await setUpOrder();
        const orderTotal = screen.getByRole(/order-total/i);
        expect(orderTotal.textContent).toBe("Total$ 99");
        expect(checkout).toBeEnabled();
        expect(empty).toBeEnabled();
    });

    test("should be able to remove items from the basket", async () => {
        const { checkout, empty } = await setUpOrder();

        const orderTotal = screen.getByRole(/order-total/i);
        expect(orderTotal.textContent).toBe("Total$ 99");

        const remove = screen.getByRole(/remove/i);
        await userEvent.click(remove);

        expect(orderTotal.textContent).toBe("Total$ 0");
        expect(checkout).toBeDisabled();
        expect(empty).toBeDisabled();
    });
});
