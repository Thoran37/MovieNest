import React from "react";
import { Outlet, Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";

function AdminDashboard() {
  return (
    <div>
      <div className="bg-gray-800 py-6">
        <IoSettingsOutline className="" />
      </div>
      <div className="flex">
        <div className="w-[175px] min-h-screen h-auto pt-4 pl-11 bg-stone-300">
          <ul className="flex flex-col space-y-5">
            <Link to="/admin/movies" className="hover:text-red-500">
              Movies <b className="ml-6">&gt;</b>
            </Link>
            <Link to="/admin/theatres" className="hover:text-red-500">
              Theatres <b className="ml-3.5">&gt;</b>
            </Link>
            <Link to="/admin/shows" className="hover:text-red-500">
              Shows <b className="ml-7">&gt;</b>
            </Link>
            <Link to="/admin/users" className="hover:text-red-500">
              Users <b className="ml-9">&gt;</b>
            </Link>
            <Link to="/admin/bookings" className="hover:text-red-500">
              Bookings <b className="ml-2.5">&gt;</b>
            </Link>
          </ul>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
