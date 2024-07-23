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
import HomeModernIcon from "@heroicons/react/24/outline/HomeModernIcon";
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
          ? "bg-indigo-700 bg-gradient-to-r from-indigo-300/70 text-white"
          : "text-black hover:bg-gray-200 hover:bg-gradient-to-r hover:from-gray-100"
      } flex max-h-10 cursor-pointer items-center gap-4 overflow-hidden rounded-r-full p-2 pl-6 font-medium transition-all duration-300`}
    >
      <Icon className="size-6 shrink-0" />
      <AnimatePresence mode="wait" initial={false}>
        {!isMenuCollapse && (
          <motion.span
            initial={{ opacity: 0, translateX: -10 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: -10 }}
            transition={{ duration: 0.3 }}
            className="!overflow-hidden whitespace-nowrap"
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
    <Paper className="z-20 h-full w-fit !bg-transparent pr-2">
      <motion.div
        initial={{ width: "fit-content" }}
        animate={{ width: isMenuCollapse ? "3rem" : "fit-content" }}
        transition={{ duration: 0.3 }}
        className="relative h-full !w-fit"
      >
        <div className="absolute -right-2 top-4 translate-x-full rounded-r-full border border-l-0 p-2 shadow">
          <div
            onClick={toggleMenuCollapse}
            className="flex size-4 items-center justify-center rounded-full border-2 border-indigo-700 hover:cursor-pointer"
          >
            {!isAutoCollapse && (
              <div className="size-2 rounded-full bg-indigo-700" />
            )}
          </div>
        </div>

        <MenuList
          className={`flex h-full flex-col gap-1 overflow-hidden transition-all duration-300 ${
            isMenuCollapse ? "w-16" : "w-48"
          }`}
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
          <div className={`flex items-center justify-between p-1.5 pl-5 pr-0`}>
            <div className="mb-4 flex items-center gap-1.5 text-[1.25rem] font-semibold uppercase text-indigo-700">
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
            href=""
            pathName={pathName}
            linkName="儀表板"
            Icon={HomeIcon}
            isMenuCollapse={isMenuCollapse}
          />
          <NavLink
            href=""
            pathName={pathName}
            linkName="系統使用者"
            Icon={UsersIcon}
            isMenuCollapse={isMenuCollapse}
          />
          <NavLink
            href="/articleManagement"
            pathName={pathName}
            linkName="論壇文章"
            Icon={NewspaperIcon}
            isMenuCollapse={isMenuCollapse}
          />
          <div className="my-4">
            <Divider textAlign="left" className="my-6 text-xs text-slate-500" />
          </div>

          <NavLink
            href="/userManagement"
            pathName={pathName}
            linkName="用戶管理"
            Icon={UsersIcon}
            isMenuCollapse={isMenuCollapse}
          />
          <NavLink
            href="/photoPostManagement"
            pathName={pathName}
            linkName="照片牆管理"
            Icon={CameraIcon}
            isMenuCollapse={isMenuCollapse}
          />
          <NavLink
            href="/communityPostManagement"
            pathName={pathName}
            linkName="論壇管理"
            Icon={HomeModernIcon}
            isMenuCollapse={isMenuCollapse}
          />
        </MenuList>
      </motion.div>
    </Paper>
  );
};

export default SideMenu;
