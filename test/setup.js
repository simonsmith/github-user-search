import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

console.error = () => {};
console.warn = () => {};

configure({adapter: new Adapter()});
