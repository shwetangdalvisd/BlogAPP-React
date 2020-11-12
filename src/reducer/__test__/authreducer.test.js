import authreducer from "./../authreducer";
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { act, render, waitForElement } from '@testing-library/react';
import {SIGN_IN,SIGN_OUT} from './../../actions/authactiontype'


const INITIAL_STATE = {
    isSignedIn: null,
    userId: null,
  };

describe('authenticate reducer', () => {
  it('returns the initial state', () => {
    expect(authreducer(undefined, {})).toEqual(INITIAL_STATE);
  });
  console.log(SIGN_IN,'ssd')
  const action={type:SIGN_IN,payload:4}
  it('returns sign in true and userid',() =>{
      expect(authreducer(INITIAL_STATE,action)).toEqual({...INITIAL_STATE,isSignedIn:true,userId:4})
  })
  it('returns sign in true and userid',() =>{
      expect(authreducer(INITIAL_STATE,{type:SIGN_OUT})).toEqual({...INITIAL_STATE,isSignedIn:false,userId: null})
  })

});