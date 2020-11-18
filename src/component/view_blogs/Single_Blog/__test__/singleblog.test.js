
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { act, render } from '@testing-library/react';
import Singleblog from '../singleblog';



describe(`<singleBlog>`, () => {
  it(`mocking response`, async () => {
    fetch.mockResponseOnce(
      JSON.stringify(
        { singleb : [
                      {
                        name: `thug`,
                        title: `random title`,
                        content: `boring content`,
                        time: `22:00am`,
                        id:5,
                        user_id:2334
        }
      ]}
    )
    );
    const props = { match: { params: { id: 5 } } };
    await act(async () =>{ 
    const {queryByTestId}=render(<Singleblog {...props} />)
    expect(queryByTestId('title')).toHaveTextContent('random title')
  });
  });
});
