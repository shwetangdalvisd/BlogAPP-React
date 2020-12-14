// import React from "react";
// import { cleanup, render } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
// import Updateblogs from "./../updateblog.js";
// import { act } from "react-dom/test-utils";

// afterEach(cleanup);

// describe(`<UpdateBlogs>`, () => {
//   it(`mocking response`, async () => {
//     fetch.mockResponseOnce(
//       JSON.stringify({
//         singleb: [
//           {
//             name: `thug`,
//             title: `random title`,
//             content: `boring content`,
//             time: `22:00am`,
//             id: 5,
//             user_id: 2334,
//           },
//         ],
//       })
//     );
//     const props = { match: { params: { id: 5 } } };
//     await act(async () => {
//       const { queryByTestId } = render(<Updateblogs {...props} />);
//       expect(queryByTestId("title")).toHaveTextContent("random title");
//     });
//   });
// });
