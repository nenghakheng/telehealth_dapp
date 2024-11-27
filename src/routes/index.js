import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const PatientPage = lazy(() => import("../pages/PatientPage"));

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `components/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: "/patient", // the url
    component: PatientPage, // view rendered
  },
];

export default routes;
