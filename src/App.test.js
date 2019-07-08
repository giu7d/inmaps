// import 'jsdom-global/register';
import React from 'react';
import App from './App';
import { mount } from 'enzyme';
import toJson from "enzyme-to-json";
import googleMapsMock from '@wapps/jest-google-maps-mock';


// import { JSDOM } from 'jsdom';

// const googleAPI = () => new Promise(success => {
//   const { window } = new JSDOM(`
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDb4pC6745EetjePNEQLn1936Wg4yYRceQ&v=3.exp&libraries=geometry,drawing,places"></script>
//       </head>
//     </html>
//   `, {runScripts: 'dangerously', resources: 'usable'});
  
//   window.googleReady = () => {
//     success(window);
//   }
// });

// const copyProps = (src, target) => {
//   Object.defineProperties(target, {
//     ...Object.getOwnPropertyDescriptors(src),
//     ...Object.getOwnPropertyDescriptors(target),
//   });
// }


describe('App', async () => {  

  beforeEach(() => {
    global.google.maps = googleMapsMock();
  });
  // const window = await googleAPI();

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


  it('renders', () => {
    const AppComponent = mount(App);
    const tree = toJson(AppComponent);
    expect(tree).toMatchSnapshot(AppComponent);
  });
});
