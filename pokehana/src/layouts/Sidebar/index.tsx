"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const links = [{ name: "Dashboard", href: "/dashboard" }];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Close when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle Sidebar"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-primary-400 text-white w-64 p-5 transition-transform duration-300 z-40
        ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:h-screen`}
      >
        <h2 className="text-2xl font-bold mb-6">PokeHana</h2>
        <nav className="flex flex-col gap-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md transition
                  ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Background overlay on mobile */}
      {open && <div className="fixed inset-0 bg-black/50 md:hidden z-30" />}
    </>
  );
}
