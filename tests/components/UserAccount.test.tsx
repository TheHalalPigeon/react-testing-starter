import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("UserAccount", () => {
  it("should render the name if the name is provided", () => {
    const user: User = {
      id: 1,
      name: "Ayat",
      isAdmin: false
    }
    render(<UserAccount user={user} />);

    const name = screen.getByText(/ayat/i);

    expect(name).toBeInTheDocument();
  });

  it("should render an edit button if the user is an admin", () => {
    const user: User = {
      id: 1,
      name: "Ayat",
      isAdmin: true
    }
    render(<UserAccount user={user} />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  it("should not render edit button if the user is not an admin", () => {
    const user: User = {
      id: 1,
      name: "Ayat",
      isAdmin: false
    }
    render(<UserAccount user={user} />);

    const button = screen.queryByRole("button");

    expect(button).not.toBeInTheDocument();
  });
});