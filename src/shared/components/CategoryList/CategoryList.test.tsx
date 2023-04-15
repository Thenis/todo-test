import React from "react";
import "reflect-metadata";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { observer } from "mobx-react-lite";
import CategoryList from "./CategoryList";

// Mock observer function
jest.mock("mobx-react-lite", () => ({
  observer: (component: any) => component,
}));

const mockListCategoriesStore = {
  getAll: jest.fn(),
  viewModel: [
    { id: "1", title: "Category 1" },
    { id: "2", title: "Category 2" },
  ],
};

// Mock useListCategoriesContext using requireActual
jest.mock("src/context/list-categories.context", () => {
  const actualModule = jest.requireActual(
    "src/context/list-categories.context"
  );
  return {
    ...actualModule,
    useListCategoriesContext: () => ({
      listCategoriesStore: mockListCategoriesStore,
    }),
  };
});

describe("CategoryList", () => {
  test("renders category list with categories from store", () => {
    render(
      <Router>
        <CategoryList />
      </Router>
    );

    expect(screen.getByText("Categories")).toBeInTheDocument();
    expect(screen.getByText("Category 1")).toBeInTheDocument();
    expect(screen.getByText("Category 2")).toBeInTheDocument();
  });

  test("calls getAll on mount", () => {
    render(
      <Router>
        <CategoryList />
      </Router>
    );

    expect(mockListCategoriesStore.getAll).toHaveBeenCalledTimes(1);
  });

  test("navigates to category page on category click", () => {
    render(
      <Router>
        <CategoryList />
      </Router>
    );

    const category1 = screen.getByText("Category 1");
    userEvent.click(category1);

    expect(window.location.pathname).toBe("/category/1");
  });
});
