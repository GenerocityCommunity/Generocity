import React from 'react'
import Adapter from 'enzyme-adapter-react-16';

import {shallow, configure} from 'enzyme'
import ItemCard from '../components/ItemCard'
import {Link} from 'react-router-dom'

configure({ adapter: new Adapter() })

const props = {

  item : {
  _id: "id",
  category: "c",
  description: "d",
  image : "i",
  status: "s",
  title : 't'
  }
}

describe('Item Card', () => {
  it('renders Link', () => {
    const wrapper = shallow(<ItemCard {...props}/>);
    
    expect(wrapper.containsMatchingElement(Link)).toEqual(true);
  });
});