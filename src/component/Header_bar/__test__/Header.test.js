import React from 'react';
import Header from './../Header';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import '@testing-library/jest-dom/extend-expect';
import configureStore  from './../../../reducer/authstore';
import authreducer from './../../../reducer/authreducer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'




afterEach(cleanup);

function renderwithRedux(component, store = configureStore) {
    return {
        ...render(<Provider store={store}>{component}</Provider>)
    }
}

const states = {
    isSignedIn : true
}


it('renders without crashing', () => {
    const {queryByTestId}=renderwithRedux(<Router><Header /></Router>);
    expect(queryByTestId("Blog App")).toBeTruthy()
    expect(queryByTestId("All Blogs")).toBeTruthy()
    expect(queryByTestId("Add Blogs")).toBeTruthy()
    expect(queryByTestId("Log IN")).toBeTruthy()
});

describe('Log in button render check',()=>{
    it('signout button check',() => {
        const {queryByTestId}=renderwithRedux(<Router><Header isSignedIn={states.isSignedIn}/></Router>)
        expect(queryByTestId("Log IN")).toBeTruthy()
    })
})