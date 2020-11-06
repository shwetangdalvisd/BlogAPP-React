import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import '@testing-library/jest-dom/extend-expect';
import configureStore from './../../../../reducer/authstore';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Updateblogs from './../updateblog';
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

afterEach(cleanup);

function renderwithRedux(component, store = configureStore) {
    return {
        ...render(<Provider store={store}>{component}</Provider>)
    }
}



it('renders without crashing', () => {
    const {queryByTestId,queryByPlaceholderText}=renderwithRedux(<Router><Updateblogs /></Router>);

});

it("renders user data", async () => {
    const fakeBlog = {    
        name: "Joni Baez",    
        title: "32",    
        content: "123, Charming Avenue", 
        id:5,
        user_id:2334,
        time:'12AM'

    };
    const id ={
        params:{
            id:2
        }
    }  
    jest.spyOn(global, "fetch").mockImplementation(() =>    
    Promise.resolve({      
        json: () => Promise.resolve(fakeBlog)    
    })  
    );
    // Use the asynchronous version of act to apply resolved promises
    await act( () => {
      render(<Provider store={configureStore}><Updateblogs match={id}/></Provider>, container);
    });

    // expect(container.textContent).toContain(fakeBlog.name);
    // expect(container.textContent).toContain(fakeBlog.title);
    // expect(container.textContent).toContain(fakeBlog.content);

    global.fetch.mockRestore();
})

