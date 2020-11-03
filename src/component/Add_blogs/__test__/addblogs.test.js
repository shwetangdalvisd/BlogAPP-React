import React from 'react';
import Header from './../addblogs';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import '@testing-library/jest-dom/extend-expect';
import configureStore  from './../../../reducer/authstore';
import authreducer from './../../../reducer/authreducer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Addblogs from './../addblogs';




afterEach(cleanup);

function renderwithRedux(component, store = configureStore) {
    return {
        ...render(<Provider store={store}>{component}</Provider>)
    }
}



it('renders without crashing', () => {
    const {queryByTestId,queryByPlaceholderText}=renderwithRedux(<Router><Addblogs /></Router>);
    expect(queryByPlaceholderText('Enter Your Name')).toBeTruthy()
    expect(queryByPlaceholderText('Enter Title')).toBeTruthy()
    expect(queryByPlaceholderText('Write Your Content Here.')).toBeTruthy()
    expect(queryByTestId("submit")).toBeTruthy()

});

