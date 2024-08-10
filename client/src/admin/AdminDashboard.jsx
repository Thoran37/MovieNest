import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Outlet, Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";

function AdminDashboard() {
  return (
    <div>
      <div className="bg-gray-800 py-6">
        <IoSettingsOutline className="" />
      </div>
      <div className="flex">
        <NavigationMenu className="w-[175px] h-screen pt-4 pl-11 bg-stone-300">
          <NavigationMenuList>
            <NavigationMenuItem className="flex flex-col space-y-5">
              <Link to="/admin/movies">
                <NavigationMenuLink className="{navigationMenuTriggerStyle()} hover:text-red-400">
                  Movies
                </NavigationMenuLink>
              </Link>
              <Link to="/admin/theatres">
                <NavigationMenuLink className="{navigationMenuTriggerStyle()} hover:text-red-400">
                  Theatres
                </NavigationMenuLink>
              </Link>
              <Link to="/admin/shows">
                <NavigationMenuLink className="{navigationMenuTriggerStyle()} hover:text-red-400">
                  Shows
                </NavigationMenuLink>
              </Link>
              <Link to="/admin/users">
                <NavigationMenuLink className="{navigationMenuTriggerStyle()} hover:text-red-400 w-[100px]">
                  Users
                </NavigationMenuLink>
              </Link>
              <Link to="/admin/bookings">
                <NavigationMenuLink className="{navigationMenuTriggerStyle()} hover:text-red-400">
                  Bookings
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
