import {
  RectangleStackIcon,
  UserIcon,
  UserGroupIcon,
  TrophyIcon,
  XMarkIcon,
  ArrowLeftOnRectangleIcon,
  ClipboardDocumentCheckIcon
} from "@heroicons/react/24/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowUpDown, CalendarDays } from "lucide-react";

export default function Sidebar({ onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(null);

  const itemData = [
    { id: 1, name: "Dashboard", icon: <RectangleStackIcon className="w-5 h-5" />, path: "/dashboard" },
    { id: 2, name: "Beneficiaries", icon: <UserIcon className="w-5 h-5" />, path: "/dashboard/beneficiares" },
    { id: 3, name: "Services", icon: <ClipboardDocumentCheckIcon className="w-5 h-5" />, path: "/dashboard/services" },
    { id: 4, name: "Appointments", icon: <CalendarDays className="w-5 h-5" />, path: "/dashboard/appointement" },
    { id: 5, name: "Entries", icon: <ArrowUpDown className="w-5 h-5" />, path: "/dashboard/entries" },
    { id: 6, name: "Testimonials", icon: <TrophyIcon className="w-5 h-5" />, path: "/dashboard/testimonials" },
    { id: 7, name: "Users", icon: <UserGroupIcon className="w-5 h-5" />, path: "/dashboard/users" },
    // Paramètres supprimés
  ];

  // Fonction de logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/dashboard/admin-login");
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-tr-xl rounded-br-xl">
      <div className="lg:hidden flex justify-end p-3">
        <button onClick={onClose}>
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <div className="p-4 flex items-center gap-2 bg-gray-100 rounded-tr-xl">
        <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold">LFD</div>
        <h1 className="text-xl font-bold text-green-600">Dashboard</h1>
      </div>

      <div className="pt-4">
        <h1 className="p-4 text-xl font-bold text-green-600">Management</h1>
      </div>

      <div className="flex flex-col flex-1 space-y-1">
        {itemData.map((item) => {
          const isActive = location.pathname === item.path || activeItem === item.id;
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => {
                setActiveItem(item.id);
                if (onClose) onClose();
              }}
              className={`flex items-center gap-3 py-2 px-4 rounded-md transition duration-200 ${
                isActive
                  ? "text-green-600 font-semibold bg-green-50"
                  : "text-gray-400 hover:text-green-600 hover:bg-green-50"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-2 bg-green-500 hover:bg-green-400 p-2 px-4 rounded-md m-4 text-md text-white font-bold transition-all"
      >
        <ArrowLeftOnRectangleIcon className="w-5 h-5" />
        Logout
      </button>
    </div>
  );
}
