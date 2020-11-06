import React from 'react';
import Header from './../Header';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import '@testing-library/jest-dom/extend-expect';
import configureStore from './../../../reducer/authstore';
import authreducer from './../../../reducer/authreducer';
import { mount,shallow } from 'enzyme';
import { MemoryRouter,Link } from 'react-router';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';



Enzyme.configure({ adapter: new Adapter() });


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'



let container = null;

afterEach(cleanup);

function renderwithRedux(component, store = configureStore) {
    return {
        ...render(<Provider store={store}>{component}</Provider>)
    }
}



it('renders without crashing', () => {
    const { queryByTestId } = renderwithRedux(<Router><Header /></Router>);
    expect(queryByTestId("Blog App")).toBeTruthy()
    expect(queryByTestId("All Blogs")).toBeTruthy()
    expect(queryByTestId("Add Blogs")).toBeTruthy()
    expect(queryByTestId("Log IN")).toBeTruthy()
});

// describe('Log in button render check',()=>{
//     it('signout button check',() => {
//         const isSignedIn = true;
//         const {queryByTestId}= act(()=>{
//             renderwithRedux(<Router><Header props={{isSignedIn:true}}/></Router>)
//         })

//         expect(queryByTestId("Sign Out")).toBeTruthy()
//     })
//     it('Log In button check',() => {
//         const isSignedIn = true;
//         const {queryByTestId}=renderwithRedux(<Router><Header isSignedIn={true}/></Router>)
//         expect(queryByTestId("Log IN")).toBeTruthy()
//     })
// })

// it('includes link to Mission scene', () => {                                       
//     const home = shallow(<Provider store={configureStore}><Header /></Provider>);                                                              
//     expect(
//         home.find('Link')
//     ).toEqual('/')                    
//   });


