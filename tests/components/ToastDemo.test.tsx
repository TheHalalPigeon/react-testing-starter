import { render, screen } from "@testing-library/react";
import ToastDemo from "../../src/components/ToastDemo";
import userEvent from "@testing-library/user-event";
import { Toaster } from "react-hot-toast";

describe("ToastDemo", () => {
  const renderButton = () => {
    render(
      <>
        <ToastDemo />
        <Toaster />
      </>
    );

    return {
      button: screen.getByRole("button"),
      user: userEvent.setup()
    }
  }

  it("should render a button", () => {
    const { button } = renderButton();

    expect(button).toHaveTextContent(/toast/i);
  });

  it("should render a toast when button is clicked", async () => {
    const { button, user } = renderButton();

    await user.click(button);

    const toast = await screen.findByText(/success/i);

    expect(toast).toBeInTheDocument();
  });
});