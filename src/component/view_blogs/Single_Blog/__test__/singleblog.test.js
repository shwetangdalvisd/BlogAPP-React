import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { act, render, waitForElement } from '@testing-library/react';
import Singleblog from '../singleblog';

//   let originFetch;
//   beforeEach(() => {
//     originFetch = global.fetch;
//   });
//   afterEach(() => {
//     global.fetch = originFetch;
//   });

  global.fetch = jest.fn(() => {
    jest.spyOn(global, "fetch").mockImplementation(() =>  {
    Promise.resolve({
      json: () =>
        Promise.resolve([{
          name: `thug`,
          title: `random title`,
          content: `boring content`,
          time: `22:00am`,
        }]),
    });
  })
  });
  
describe(`<singleBlog>`, () => {
  it(`mocking response`, async () => {
    const props = { match: { params: { id: 5 } } };
    await act(async() => render(<Singleblog {...props} />));
  });
});

// ----------------------------------------------------------------

// beforeEach(() => {
//   fetch.resetMocks();
// });

// it("mocking fetch", async () => {
//   global.fetch.mockResponseOnce(JSON.stringify([{
//           name: `thug`,
//           title: `random title`,
//           content: `boring content`,
//           time: `22:00am`,
//         }]));
//     const props = { match: { params: { id: 2 } } };

//     const rate = await Singleblog(props);

//   expect(rate).toEqual(1.42);
//   expect(fetch).toHaveBeenCalledTimes(1);
// });

// ______________________________________________________________________________

// describe('fetch request', () => {
//     const props = {match:{params:{id:2}}};
//     const blogs = [{
//           name: `thug`,
//           title: `random title`,
//           content: `boring content`,
//           time: `22:00am`,
//         }];
//     it('Get Blog Info For user', () => {
//         const requestSpy = jest.spyOn(fetch, 'fetch').mockResolvedValue(blogs);
//         return Singleblog(props)
//             .then(response => {
//                 expect(container.textContent).toContain(`thug`);
//                 expect(requestSpy).toHaveBeenCalledWith({
//                     method: 'GET',
//                     path: Singleblog(props)
//                 });
//             });
//     });
// });

// ----------------------------------------------------------------------
