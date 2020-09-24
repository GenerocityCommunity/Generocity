import React from 'react'
import Adapter from 'enzyme-adapter-react-16';

import {shallow, mount, configure} from 'enzyme'
import SignUp from '../components/SignUp'


const props = {
  props :{
    
      isLoggedIn: false,
      allItems: [], 
      email: '',
      points: '',
      firstName: '',
      lastName: '',
      password: '',
      street: '',
      street2: '', 
      city: '',
      state: '',
      zipCode: '',
      latitude: null,
      longitude: null,
      title: '',
      description: '',
      category: '',
      image: '',
      status: false,
      user_id: '',
      redirect: null,
    }

  }



configure({ adapter: new Adapter() })


describe('Sign Up', () => {
  it('exists', () => {
    const wrapper = shallow(<SignUp {...props}/>);
    
    expect(wrapper.find('.container loginAndSignUp')).toHaveLength(0);
  });
  
  it('handles Change', () => {
    const onChange = jest.fn(),
    props ={
    
      isLoggedIn: false,
      allItems: [], 
      email: '',
      points: '',
      firstName: '',
      lastName: '',
      password: '',
      street: '',
      street2: '', 
      city: '',
      state: '',
      zipCode: '',
      latitude: null,
      longitude: null,
      title: '',
      description: '',
      category: '',
      image: '',
      status: false,
      user_id: '',
      redirect: null,
      handleChange: onChange,
      handleSignUpSubmit: onChange,
      onChange
    }
    const SignUpComponent = mount(<SignUp {...props}/>).find('input')
    console.log(SignUpComponent)
    SignUpComponent.forEach((e) => {
      console.log('e',e)
      e.simulate('change', { target: {email: '2018-01-22'} })})

    expect(onChange).toHaveBeenCalledWith('22.01.2018');

  })

});