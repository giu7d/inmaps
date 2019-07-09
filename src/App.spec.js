import React, { Component } from 'react';
import './setupTest';
import { mount, shallow } from 'enzyme';
import App from './App';
import Login from './container/Layout/Login';

describe('<App />', () => {

  it("should render the login page for the non logged user", () => {
    
    const props = {
      user: null,
      singOut: jest.fn(() => {}),
      signInWithGoogle: jest.fn(() => {})
    }

    // Componente Pronto
    const wrapper = mount(<App {...props} />)

    // Resultaods Especuladas
    expect(wrapper.find(Login).length).toEqual(1);
  });

});