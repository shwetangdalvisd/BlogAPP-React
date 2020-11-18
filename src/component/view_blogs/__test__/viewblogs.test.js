
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { act, render } from '@testing-library/react';
import Viewblogs from './../viewblogs';
import {fetchdataV} from './../../Fetchdata/fetchdata'
import configureStore from './../../../reducer/authstore'
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom'

jest.mock('./../../Fetchdata/fetchdata.js');
function renderwithRedux(component, store = configureStore) {
    return {
        ...render(<Provider store={store}>{component}</Provider>)
    }
}


it(`mocking response`, async () => {
  const userData ={ 
    blogs :[{
      name: `thug`,
      title: `random title`,
      content: `boring content`,
      time: `22:00am`,
      id:5,
      user_id:2334,

  }]
}
  fetchdataV.mockResolvedValue(userData);
  await act(async () => {
    const {queryByTestId} = renderwithRedux(<Router><Viewblogs /></Router>)
    expect(queryByTestId('content')).toHaveTextContent('boring content')
  });
  

  });