import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { act, render } from "@testing-library/react";
import Viewblogs, { getBlogsQuery } from "./../viewblogs";
import configureStore from "./../../../reducer/authstore";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
const renderer = require("react-test-renderer");

it("should render loading state initially", () => {
  const { queryByTestId } = render(
    <Provider store={configureStore}>
      <Router>
        <MockedProvider mocks={[]}>
          <Viewblogs />
        </MockedProvider>
      </Router>
    </Provider>
  );

  expect(queryByTestId("loading")).toHaveTextContent("Loading ...");
});

it("should render data", async () => {
  const mocks = [
    {
      request: {
        query: getBlogsQuery,
      },
      result: {
        data: {
          posts: [
            {
              name: `shwetang`,
              id: `5fc8ec3a2cee600d003440c7`,
              title: `sd`,
              content: `scacdad`,
              like: 0,
              user_id: `7wsdscseec`,
              __typename: `Blog`,
            },
          ],
        },
      },
    },
  ];
  const { queryByTestId } = render(
    <Provider store={configureStore}>
      <Router>
        <MockedProvider mocks={mocks} removeTypename>
          <Viewblogs />
        </MockedProvider>
      </Router>
    </Provider>
  );
  await new Promise(resolve => setTimeout(resolve, 0));
  expect(queryByTestId('title')).toHaveTextContent("sd");
  expect(queryByTestId('content')).toHaveTextContent("scacdad");
});
