import ProductPage from "@/pages/product/server";
import { render, screen } from "@testing-library/react";

describe("Product Page", () => {
    it("Render Product Page", () => {
        const page = render(<ProductPage products={[]} />);
        expect(page).toMatchSnapshot();
    });

});