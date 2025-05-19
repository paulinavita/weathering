import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "@/app/components/SearchBar";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach } from "vitest";

describe("Render SearchBar Component", () => {
  const mockOnSearch = vi.fn();
  const defaultProps = {
    onSearch: mockOnSearch,
    isLoading: false,
    searchValue: "",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders search bar with correct elements", () => {
    render(<SearchBar {...defaultProps} />);

    expect(screen.getByText("Search by city")).toBeDefined();
    expect(screen.getByPlaceholderText("e.g Bali")).toBeDefined();
    expect(screen.getByRole("button", { name: "Search" })).toBeDefined();
  });

  it("updates input value when typing", async () => {
    const user = userEvent.setup();
    render(<SearchBar {...defaultProps} />);

    const input = screen.getByTestId("search-input");
    await user.type(input, "Paris");

    expect(input.value).to.equal("Paris");
  });
  it("calls onSearch when search button is clicked w non-empty input", () => {
    render(<SearchBar {...defaultProps} />);

    const input = screen.getByPlaceholderText("e.g Bali");
    const searchButton = screen.getByRole("button", { name: "Search" });

    fireEvent.change(input, { target: { value: "London" } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith("London");
  });

  it("does not call onSearch when search button is clicked with empty input", () => {
    render(<SearchBar {...defaultProps} />);

    const searchButton = screen.getByRole("button", { name: "Search" });
    fireEvent.click(searchButton);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it("calls onSearch when Enter key is pressed with non-empty input", () => {
    render(<SearchBar {...defaultProps} />);

    const input = screen.getByPlaceholderText("e.g Bali");
    fireEvent.change(input, { target: { value: "Paris" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockOnSearch).toHaveBeenCalledWith("Paris");
  });

  it("does not call onSearch when Enter key is pressed with empty input", () => {
    render(<SearchBar {...defaultProps} />);

    const input = screen.getByPlaceholderText("e.g Bali");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it("shows loading state when isLoading is true", () => {
    render(<SearchBar {...defaultProps} isLoading={true} />);

    expect(screen.getByTestId("search-btn")).toHaveProperty("disabled", true);
  });

  it("updates input value when searchValue prop changes", () => {
    const { rerender } = render(<SearchBar {...defaultProps} />);
    rerender(<SearchBar {...defaultProps} searchValue="Pol" />);
    const inp = screen.getByPlaceholderText("e.g Bali");
    expect(inp.value).to.equal("Pol");
  });
});
