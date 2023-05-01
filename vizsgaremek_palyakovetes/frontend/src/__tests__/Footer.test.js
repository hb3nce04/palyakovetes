import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

test("Footer renderelés teszt", () => {
  render(<Footer />);
});

test("Védjegy komponens renderelés teszt", () => {
  render(<Footer />);
  const renderTrademark = screen.getByTestId("trademark");
  expect(renderTrademark).toBeInTheDocument();
});

test("Verziószám komponens renderelés teszt", () => {
  render(<Footer />);
  const renderVersionNumber = screen.getByTestId("versionNumber");
  expect(renderVersionNumber).toBeInTheDocument();
});
