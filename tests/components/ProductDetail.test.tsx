import { render, screen } from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail";
import { products } from "../mocks/data";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";

describe("ProductDetail", () => {
  it("should return product name and price if product is found", async () => {
    render(<ProductDetail productId={1} />);

    const product = await screen.findByText(new RegExp(products[0].name));
    const price = await screen.findByText(new RegExp(products[0].price.toString()));

    expect(product).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });

  it("should return product not found and price if product is not found", async () => {
    server.use(http.get("/products/1", () => HttpResponse.json(null)));

    render(<ProductDetail productId={1} />);

    const message = await screen.findByText(/not found/i);

    expect(message).toBeInTheDocument();
  });

  it("should return an error for invalid product id", async () => {
    render(<ProductDetail productId={0} />);

    const message = await screen.findByText(/invalid/i);

    expect(message).toBeInTheDocument();
  });
});