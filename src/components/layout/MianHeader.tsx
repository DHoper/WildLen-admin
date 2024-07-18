"use client";

import React, { useState, MouseEvent } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { BellIcon, CogIcon, UserIcon } from "@heroicons/react/24/outline";

const MainHeader: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="w-full sticky top-0 flex p-2 py-1 bg-transparent border">
      <div className="ml-auto flex px-4">
        <IconButton color="inherit" disableRipple>
          <BellIcon className="h-6 w-6" />
        </IconButton>
        {/* <IconButton edge="end" color="inherit" onClick={handleMenuOpen}>
          <Avatar src="/images/avatar.jpg" alt="User Avatar" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          slotProps={{
            paper: {
              style: {
                transform: "translateY(40px)",
              },
            },
          }}
        >
          <Box display="flex" alignItems="center" px={2} py={1}>
            <Avatar src="/images/avatar.jpg" alt="User Avatar" />
            <Box ml={2}>
              <Typography variant="body1">John Doe</Typography>
              <Typography variant="body2" color="textSecondary">
                johndoe@example.com
              </Typography>
            </Box>
          </Box>
          <MenuItem onClick={handleMenuClose}>
            <UserIcon className="h-5 w-5 mr-2" />
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <CogIcon className="h-5 w-5 mr-2" />
          </MenuItem>
        </Menu> */}
      </div>
    </div>
  );
};

export default MainHeader;
