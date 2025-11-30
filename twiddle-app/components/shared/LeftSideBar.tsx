"use client";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

const LeftSideBar = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  return (
    <>
      <section className="leftsidebar custom-scrollbar">
        <div className="flex w-full flex-1 flex-col gap-6 px-6">
          {sidebarLinks.map((link) => {
            const href =
              link.route === "/profile" && userId
                ? `${link.route}/${userId}`
                : link.route;
            const isActive =
              pathname === href ||
              (href.length > 1 && pathname.startsWith(href));

            return (
              <Link
                href={href}
                key={link.label}
                className={`leftsidebar_link ${
                  isActive ? "bg-primary-500" : ""
                }`}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />
                <p className="text-light-1">{link.label}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default LeftSideBar;
