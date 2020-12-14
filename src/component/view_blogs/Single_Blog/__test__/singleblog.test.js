import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { act, render } from "@testing-library/react";
import Singleblog, { getBlogsQuery } from "../singleblog";
import { MockedProvider } from "@apollo/client/testing";
import moment from 'moment';

// it("should render loading state initially", () => {
//   const props = { match: { params: { id: "5fc8ec3a2cee600d003440c7" } } };
//   const { queryByTestId } = render(
//     <MockedProvider mocks={[]}>
//       <Singleblog {...props} />
//     </MockedProvider>
//   );

//   // expect(queryByTestId("loading")).toHaveTextContent("Loading ...");
// });

it("should render data", async () => {
  const t = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
  const mocks = [
    {
      request: {
        query: getBlogsQuery,
        variables:{
          id:"5fc8ec3a2cee600d003440c7"
        }
      },
      result: {
        data: {
          post: {
            name: `shwetang`,
            id: `5fc8ec3a2cee600d003440c7`,
            title: `sd`,
            content: `scacdad`,
            like: 0,
            user_id: `7wsdscseec`,
            __typename: `Blog`,
          },
        },
      },
    },
  ];
  const props = { match: { params: { id: "5fc8ec3a2cee600d003440c7" } } };
  const { findByText, getByText } = render(
    <MockedProvider mocks={[mocks]}>
      <Singleblog {...props} />
    </MockedProvider>
  );
});
