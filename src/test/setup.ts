import '@testing-library/jest-dom/vitest';

// jsdom does not implement window.scrollTo; Layout calls it on every route change.
window.scrollTo = () => {};
