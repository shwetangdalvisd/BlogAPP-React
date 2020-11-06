import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Addblogs from "./component/Add_blogs/addblogs"
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';



Enzyme.configure({ adapter: new Adapter() });




it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

// test('/addblogs should render Addblogs component', () => {
//   const wrapper = mount(
//     <MemoryRouter initialEntries={[ '/addblogs' ]}>
//       <App/>
//     </MemoryRouter>
//   );
//   expect(wrapper.find(Addblogs)).toHaveLength(1);
// });

