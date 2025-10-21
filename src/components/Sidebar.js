"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    HomeIcon,
    PlusIcon,
    FileTextIcon,
    PersonIcon,
    CalendarIcon
} from "@radix-ui/react-icons";

const navigationItems = [
    {
        name: "Tableau de bord",
        href: "/",
        icon: HomeIcon,
    },
    {
        name: "Créer une intervention",
        href: "/create-intervention",
        icon: PlusIcon,
    },
    {
        name: "Créer un projet",
        href: "/create-projet",
        icon: FileTextIcon,
    },
    {
        name: "Créer un salarié",
        href: "/create-salarie",
        icon: PersonIcon,
    },
    {
        name: "Planning salariés",
        href: "/employee-schedule",
        icon: CalendarIcon,
    },
    {
        name: "Vue projets",
        href: "/project-overview",
        icon: FileTextIcon,
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 bg-gray-900 text-white h-full flex flex-col">
            {/* Logo/Header */}
            <div className="p-6 border-b border-gray-700">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <CalendarIcon className="w-6 h-6" />
                    Gestion BTP
                </h1>
                <p className="text-gray-400 text-sm mt-1">Interventions</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="text-sm font-medium">{item.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700">
                <p className="text-xs text-gray-400 text-center">
                    © 2024 Gestion BTP
                </p>
            </div>
        </div>
    );
}