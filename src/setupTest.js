import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
const { JSDOM } = require('jsdom');

// Configure Adapter
configure({ adapter: new Adapter() });

// // Load Globals
// const jsdom = new JSDOM(`
// <!DOCTYPE html>
// <html>
//   <head>
//     <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDb4pC6745EetjePNEQLn1936Wg4yYRceQ&v=3.exp&libraries=geometry,drawing,places"></script>
//   </head>
// </html>
// `, {runScripts: "dangerously"});

// const { window } = jsdom;

// function copyProps(src, target) {
//   Object.defineProperties(target, {
//     ...Object.getOwnPropertyDescriptors(src),
//     ...Object.getOwnPropertyDescriptors(target),
//   });
// }

// global.window = window;
// global.document = window.document;
// global.navigator = {
//   userAgent: 'node.js',
// };
// global.requestAnimationFrame = function (callback) {
//   return setTimeout(callback, 0);
// };
// global.cancelAnimationFrame = function (id) {
//   clearTimeout(id);
// };
// copyProps(window, global);