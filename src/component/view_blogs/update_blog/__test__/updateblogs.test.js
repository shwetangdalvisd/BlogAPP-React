import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import '@testing-library/jest-dom/extend-expect';
import configureStore from './../../../../reducer/authstore';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Updateblogs from './../updateblog.js';
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";


afterEach(cleanup);

function renderwithRedux(component, store = configureStore) {
    return {
        ...render(<Provider store={store}>{component}</Provider>)
    }
}

    const blogs =[{    
        name: "Joni Baez",    
        title: "32",    
        content: "123, Charming Avenue", 
        id:5,
        user_id:2334,
        time:'12AM'

    }];
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
describe(`<updateBlog>`, () => {
  it(`mocking response`, async () => {
    const props = { match: { params: { id: 5 } } };
    await act(async() => render(<Updateblogs {...props} />));
  });
});
