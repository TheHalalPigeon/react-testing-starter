import { render, screen } from "@testing-library/react";
import SearchBox from "../../src/components/SearchBox";
import userEvent from "@testing-library/user-event";

describe("SearchBox", () => {
  const renderComponent = () => {
    const onChange = vi.fn();

    render(<SearchBox onChange={onChange} />);

    return {
      searchBox: screen.getByPlaceholderText(/search/i),
      user: userEvent.setup(),
      onChange
    }
  }

  it("should render the empty search box", () => {
    const { searchBox } = renderComponent();

    expect(searchBox).toBeInTheDocument();
    expect(searchBox).toHaveTextContent("");
  });

  it("should call onChange when the user presses enter", async () => {
    const { searchBox, onChange, user } = renderComponent();

    const searchTerm = "hello";
    await user.type(searchBox, `${searchTerm}{enter}`);

    expect(onChange).toBeCalledWith(searchTerm);
  });

  it("should not call onChange if the search box is empty", async () => {
    const { searchBox, onChange, user } = renderComponent();
    
    await user.type(searchBox, "{enter}");

    expect(onChange).not.toBeCalledWith();
  });
});