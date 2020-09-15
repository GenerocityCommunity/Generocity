import React from 'react';
import ItemCard from '../components/ItemCard';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer'

const props = {

item: {  _id : "01",
      category : "test",
      description : "test",
      image : "test",
      status : "test",
      title : "test",
}
}


describe('Item Card', () => {
  ItemCard('matches snapshot', ()=> {


    

    const tree = renderer.create(<ItemCard/>).toJSON()

    expect(tree.children.length).toBe(1);
  })

})