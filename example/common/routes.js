const {a, div, h1, section} = require('@cycle/dom');

const appSection = headerText => 
  section('.layout', 
    [
      h1(headerText),
      a('.menu-link', {attrs: {href: '/about'}}, 'about'),
      a('.menu-link', {attrs: {href: '/about/param'}}, 'about/param'),
      a('.menu-link--back', {attrs: {href: ''}}, '<- go back')
    ]
  );

module.exports = [
  {
    path: '/',
    action: () => appSection('Home yo!')
  },
  {
    path: '/about',
    action: () => appSection('About yo!')
  },
  {
    path: '/about/:param',
    action: ({params: {param}}) => appSection(`About yo ${param}!`)
  }
];