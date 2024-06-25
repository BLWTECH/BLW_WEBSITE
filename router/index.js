import { HomePage } from '../pages/HomePage.js';
import { PricingPage } from '../pages/PricingPage.js';
import { BlogPage } from '../pages/BlogPage.js';
import { PageNotFound } from '../pages/PageNotFound.js';

const routes = {
  '/': HomePage,
  '/pricing': PricingPage,
  '/blog': BlogPage,
};

const rootDiv = document.getElementById('app');

const render = (route) => {
  const page = routes[route] || PageNotFound;  // Fallback to NoTFound if route is not found
  rootDiv.innerHTML = page();
};

const onNavItemClick = (path) => {
  window.history.pushState({}, path, window.location.origin + path);
  render(path);
};

window.onpopstate = () => {
  render(window.location.pathname);
};

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('nav a')) {
      e.preventDefault();
      const path = e.target.getAttribute('href');
      onNavItemClick(path);
    }
  });

  render(window.location.pathname);  // Initial render based on current path
});
