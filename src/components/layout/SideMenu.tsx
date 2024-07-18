"use client";

import Image from "next/image";
import { Divider, MenuList, Paper } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import NewspaperIcon from "@heroicons/react/24/outline/NewspaperIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CameraIcon from "@heroicons/react/24/outline/CameraIcon";
import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import { AnimatePresence, motion } from "framer-motion";

interface NavLinkProps {
  linkName: string;
  href: string;
  pathName: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isMenuCollapse: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  linkName,
  href,
  pathName,
  Icon,
  isMenuCollapse,
}) => (
  <Link href={href}>
    <div
      className={`${
        pathName === href
          ? "text-white bg-indigo-700 bg-gradient-to-r from-indigo-300/70"
          : "text-black hover:bg-gray-200 hover:bg-gradient-to-r hover:from-gray-100"
      } pl-6 flex items-center gap-4 py-2 px-2 rounded-r-full font-medium overflow-hidden max-h-10 transition-all duration-300 cursor-pointer`}
    >
      <Icon className="shrink-0 h-6 w-6" />
      <AnimatePresence mode="wait" initial={false}>
        {!isMenuCollapse && (
          <motion.span
            initial={{ opacity: 0, translateX: -10 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: -10 }}
            transition={{ duration: 0.3 }}
            className="whitespace-nowrap !overflow-hidden"
          >
            {linkName}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  </Link>
);

const SideMenu: React.FC = () => {
  const [isMenuCollapse, setIsMenuCollapse] = useState<boolean>(false);
  const [isAutoCollapse, setIsAutoCollapse] = useState<boolean>(false);
  const pathName = usePathname();

  const toggleMenuCollapse = () => {
    setIsMenuCollapse((prevState) => !prevState);
    setIsAutoCollapse((prevState) => !prevState);
  };

  const handleHover = (hovered: boolean) => {
    if (isAutoCollapse) {
      setIsMenuCollapse(!hovered);
    }
  };

  return (
    <Paper className="h-full w-fit !bg-transparent pr-2 z-20">
      <motion.div
        initial={{ width: "fit-content" }}
        animate={{ width: isMenuCollapse ? "3rem" : "fit-content" }}
        transition={{ duration: 0.3 }}
        className="h-full relative !w-fit"
      >
        <div className="absolute top-4 -right-2 translate-x-full p-2 rounded-r-full border border-l-0 shadow">
          <div
            onClick={toggleMenuCollapse}
            className="flex justify-center items-center border-2 border-indigo-700 rounded-full w-4 h-4 hover:cursor-pointer"
          >
            {!isAutoCollapse && (
              <div className="w-2 h-2 bg-indigo-700 rounded-full" />
            )}
          </div>
        </div>

        <MenuList
          className={`flex flex-col gap-1 h-full transition-all duration-300 overflow-hidden ${
            isMenuCollapse ? "w-16" : "w-48"
          }`}
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
          <div className={`flex items-center justify-between p-1.5 pl-5 pr-0`}>
            <div className="flex items-center gap-1.5 text-[1.25rem] text-indigo-700 uppercase font-semibold">
              <Image
                src="/images/deerIcon.png"
                alt="deerIcon"
                width={35}
                height={35}
              />
              <AnimatePresence mode="wait" initial={false}>
                {!isMenuCollapse && (
                  <motion.div
                    initial={{ opacity: 0, translateX: -5 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    exit={{ opacity: 0, translateX: -5 }}
                    transition={{ duration: 0.3 }}
                    className="whitespace-nowrap"
                  >
                    WildLen
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <NavLink
            href="/home"
            pathName={pathName}
            linkName="儀表板"
            Icon={HomeIcon}
            isMenuCollapse={isMenuCollapse}
          />
          <NavLink
            href="/adminUser"
            pathName={pathName}
            linkName="系統使用者"
            Icon={UsersIcon}
            isMenuCollapse={isMenuCollapse}
          />
          <div className="my-4">
            <Divider textAlign="left" className="text-xs text-slate-500 my-6">
              {/* {!isMenuCollapse && "網站管理"} */}
            </Divider>
          </div>

          <NavLink
            href="/userManagement"
            pathName={pathName}
            linkName="用戶管理"
            Icon={UsersIcon}
            isMenuCollapse={isMenuCollapse}
          />
          <NavLink
            href="/articleManagement"
            pathName={pathName}
            linkName="文章管理"
            Icon={NewspaperIcon}
            isMenuCollapse={isMenuCollapse}
          />
          <NavLink
            href="/photoPostManagement"
            pathName={pathName}
            linkName="照片牆管理"
            Icon={CameraIcon}
            isMenuCollapse={isMenuCollapse}
          />
        </MenuList>
      </motion.div>
    </Paper>
  );
};

export default SideMenu;
