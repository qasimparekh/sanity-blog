//? theming currently depreciated, but can be used to style the sanity studio by customizing it with our own theme of project

import { buildLegacyTheme } from "sanity";

const props = {
  "--my-white": "#fff",
  "--my-black": "#000",
  "--my-brand": "#8178E6",
  "--my-red": "#db4437",
  "--my-yellow": "#f4b400",
  "--my-green": "#0f9d58",
};

export const myTheme = buildLegacyTheme({
  // Base Theme Color
  "--black": props["--my-black"],
  "--white": props["--my-white"],

  "--gray": "#666",
  "--gray-base": "#666",

  "--component-bg": props["--my-white"],
  "--component-text-color": props["--my-white"],

  // BRAND COLOR
  "--brand-primary": props["--my-brand"],

  // Default
  "--default-button-color": "#666",
  "--default-button-primary-color": props["--my-brand"],
  "--default-button-success-color": props["--my-green"],
  "--default-button-warning-color": props["--my-yellow"],
  "--default-button-danger-color": props["--my-red"],

  // State
  "--state-info-color": props["--my-brand"],
  "--state-success-color": props["--my-green"],
  "--state-warning-color": props["--my-yellow"],
  "--state-danger-color": props["--my-red"],

  // Navbar
  "--main-navigation-color": props["--my-black"],
  "--main-navigation-color--inverted": props["--my-white"],

  "--focus-color": props["--my-brand"],
});
