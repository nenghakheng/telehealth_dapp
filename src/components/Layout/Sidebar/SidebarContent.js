import React from "react";
import routes from "../../../routes/sidebar";
import { NavLink } from "react-router-dom";
import * as Icons from "../../../icons";
import SidebarSubmenu from "./SidebarSubmenu";
import { Button } from "@windmill/react-ui";

function Icon({ icon, ...props }) {
  if (!icon) {
    console.error(`Icon "${icon}" not found in icons.`);
    return null;
  }
  const SelectedIcon = Icons[icon];
  if (!SelectedIcon) {
    console.error(`Icon "${icon}" not found in icons.`);
    return null;
  }
  return <SelectedIcon {...props} />;
}

function SidebarContent() {
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <a
        className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
        href="#"
      >
        Telehealth
      </a>
      <ul className="mt-6">
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <NavLink
                to={route.path}
                className={({ isActive }) =>
                  `inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 ${
                    isActive
                      ? "text-gray-800 dark:text-gray-100"
                      : "hover:text-gray-800 dark:hover:text-gray-200"
                  }`
                }
              >
                {route.path && (
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                )}
                <Icon
                  className="w-5 h-5"
                  aria-hidden="true"
                  icon={route.icon}
                />
                <span className="ml-4">{route.name}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default SidebarContent;
