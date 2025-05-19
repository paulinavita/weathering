import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import { useRouter, useSearchParams } from "next/navigation";
import { vi, describe, it, expect, beforeEach } from "vitest";
import useSWR from "swr";

const mockSwrReturn = {
  data: null,
  error: null,
  isLoading: true,
  isValidating: false,
  mutate: vi.fn(),
};

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock("swr", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("Render page.tsx", () => {
  const mockRouter = {
    replace: vi.fn(),
  };

  const mockSearchParams = {
    get: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useRouter.mockReturnValue(mockRouter);
    useSearchParams.mockReturnValue(mockSearchParams);
    useSWR.mockReturnValue(mockSwrReturn);
  });

  it("should render page with correct title", () => {
    render(<Home />);
    expect(screen.getByText("Get the weather in your city")).toBeDefined();
  });

  it("should redirect to default city when no city is provided", () => {
    mockSearchParams.get.mockReturnValue(null);
    render(<Home />);
    expect(mockRouter.replace).toHaveBeenCalledWith("/?city=Bali");
  });

  it("should show skeleton when fetching weather data", () => {
    mockSearchParams.get.mockReturnValue("tromso");
    vi.mocked(useSWR).mockImplementation(() => mockSwrReturn);
    render(<Home />);
    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons).toBeDefined();
  });
});
