import React from 'react';
import Header from './../Header';
import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router} from 'react-router-dom'
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
 
describe('My Connected React-Redux Component', () => {
 
    const store = mockStore({
      isSignedIn: true,
      userId:3
    });
 
    const {queryByTestId} = render(
      <Provider store={store}>
      <Router>
        <Header />
      </Router>
      </Provider>
    );

 
  it('should render with given state from Redux store', () => {
    expect(queryByTestId('Blog App')).toBeTruthy()
    expect(queryByTestId("All Blogs")).toBeTruthy()
    expect(queryByTestId("Add Blogs")).toBeTruthy()
    expect(queryByTestId(`login_button`)).toHaveTextContent(`Sign out`)
  });
 
});