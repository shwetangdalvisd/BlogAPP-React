import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";
import configureStore from "./../../../reducer/authstore";
import { BrowserRouter as Router } from "react-router-dom";
import Addblogs from "./../addblogs";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MockedProvider } from "@apollo/client/testing";

Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup);

function renderwithRedux(component, store = configureStore) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
}

it("renders without crashing", () => {
  const { queryByTestId, queryByPlaceholderText } = renderwithRedux(
    <MockedProvider mocks={[]} removeTypename>
      <Router>
        <Addblogs />
      </Router>
    </MockedProvider>
  );
  expect(queryByPlaceholderText("Enter Your Name")).toBeTruthy();
  expect(queryByPlaceholderText("Enter Title")).toBeTruthy();
  expect(queryByPlaceholderText("Write Your Content Here.")).toBeTruthy();
  expect(queryByTestId("submit")).toBeTruthy();
});

it(`filling the form`, () => {
  const { queryByPlaceholderText } = renderwithRedux(
    <MockedProvider mocks={[]} removeTypename>
      <Router>
        <Addblogs />
      </Router>
    </MockedProvider>
  );

  fireEvent.change(queryByPlaceholderText("Enter Your Name"), {
    target: { value: "test1" },
  });
  fireEvent.change(queryByPlaceholderText("Enter Title"), {
    target: { value: "test title" },
  });
  fireEvent.change(queryByPlaceholderText("Write Your Content Here."), {
    target: { value: "some random content" },
  });
  expect(queryByPlaceholderText("Enter Your Name")).toHaveValue("test1");
  expect(queryByPlaceholderText("Enter Title")).toHaveValue("test title");
  expect(queryByPlaceholderText("Write Your Content Here.")).toHaveValue(
    "some random content"
  );
});

it(`check for validation and errors thrown`, () => {
  const { queryByTestId } = renderwithRedux(
    <MockedProvider mocks={[]} removeTypename>
      <Router>
        <Addblogs />
      </Router>
    </MockedProvider>
  );
  fireEvent.click(queryByTestId("submit"));
  expect(queryByTestId("title error")).toHaveTextContent(
    "Title cannot be blank"
  );
  expect(queryByTestId("name error")).toHaveTextContent("Name cannot be blank");
  expect(queryByTestId("content error")).toHaveTextContent(
    "Content cannot be blank"
  );
});
