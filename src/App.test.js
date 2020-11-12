import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Addblogs from "./component/Add_blogs/addblogs.js"
import { shallow,mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Singleblog from "./component/view_blogs/Single_Blog/singleblog"
import Updateblog from "./component/view_blogs/update_blog/updateblog.js"
import Viewblogs from './component/view_blogs/viewblogs.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'




Enzyme.configure({ adapter: new Adapter() });




it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

const component = shallow(<App />);
console.log(component,'com')
const pathMap = component.find(Route).reduce((pathMap, route) => {
    const routeProps = route.props();
    pathMap[routeProps.path] = routeProps.component;
    return pathMap;
}, {});
console.log(pathMap);

  it('should show Home component for / router (getting array of routes)', () => {

    expect(pathMap['/addblogs']).toBe(Addblogs);
    expect(pathMap['/singleblog/:id']).toBe(Singleblog);
    expect(pathMap['/viewblogs']).toBe(Viewblogs);
    expect(pathMap['/updateblog/:id']).toBe(Updateblog);

  })