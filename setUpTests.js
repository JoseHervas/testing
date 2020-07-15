/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

// jest-dom adds custom jest matchers for react
const dom = require("@testing-library/jest-dom");
const React = require("react");

// To render elements (with enzyme and react-testing-library) we have to fake a Browser environment
const { configure } = require("enzyme");
const { JSDOM } = require("jsdom");
const Adapter = require("enzyme-adapter-react-16");

const jsdom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost",
});
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: "node.js",
};
global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (id) {
  clearTimeout(id);
};
copyProps(window, global);

// Antd uses methods from the window that JSDOM (jest) does not have
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

configure({ adapter: new Adapter() });
