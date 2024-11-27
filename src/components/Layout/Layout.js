import React, { useContext, Suspense, useEffect, lazy } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import routes from "../../routes";

import Sidebar from "../Layout/Sidebar/Index";
import Header from "../Layout/Header/Header";
import Main from "./Main";
import ThemedSuspense from "../ThemedSuspense";
import { SidebarContext } from "../../contexts/SidebarContext";

const Page404 = lazy(() => import("../../pages/404"));

function Layout() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  let location = useLocation();

  // Close the sidebar on route change
  useEffect(() => {
    closeSidebar();
  }, [closeSidebar, location]);

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
        isSidebarOpen && "overflow-hidden"
      }`}
    >
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Routes>
              {routes.map((route, i) => {
                return route.component ? (
                  <Route
                    key={i}
                    path={`/app${route.path}`}
                    element={<route.component />}
                  />
                ) : null;
              })}
              {/* Redirect to dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
              {/* Catch-all route for 404 */}
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </Main>
      </div>
    </div>
  );
}

export default Layout;
