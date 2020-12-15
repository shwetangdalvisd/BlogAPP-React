import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Updateblog, { getBlogsQuery } from "../updateblog";
import { MockedProvider } from "@apollo/client/testing";
import moment from "moment";

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
  const t = moment(new Date()).format("YYYY-MM-DD[T00:00:00.000Z]");
  const mocks = [
    {
      request: {
        query: getBlogsQuery,
        variables: {
          id: "5fc8ec3a2cee600d003440c7",
        },
      },
      result: {
        data: {
          post: {
            content: "scacdad",
            id: "5fc8ec3a2cee600d003440c7",
            like: 0,
            name: "shwetang",
            title: "sd",
            user_id: null,
            __typename: "Blog",
          },
        },
      },
    },
  ];
  const props = { match: { params: { id: "5fc8ec3a2cee600d003440c7" } } };
  const utils = render(
    <MockedProvider mocks={mocks} removeTypename>
      <Updateblog {...props} />
    </MockedProvider>
  );
  await new Promise(resolve => setTimeout(resolve, 0));
  const input = utils.getByLabelText('title')
  expect(input.value).toBe('sd')
  const inputt = utils.getByLabelText('content')
  expect(inputt.value).toBe('scacdad')

//   expect(queryByTestId('title')).toHaveTextContent("");
});
