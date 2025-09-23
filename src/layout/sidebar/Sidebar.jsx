import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import { Box, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { Menu, Dashboard, People, ExpandLess, ExpandMore, Person, Logout } from '@mui/icons-material';

import { StyledDrawer, LogoBox, MenuListItem, SubMenuListItem, LogoutListItem } from '@layout/sidebar/SidebarStyle';
import { useSidebar } from "@layout/sidebar/SidebarProvider";
import * as gateway from "@components/common/Gateway";

const menuItems = [
    {
        title: '대시보드',
        icon: <Dashboard />,
        path: '/home',
    },
    {
        title: '프로필 관리',
        icon: <People />,
        children: [
            { title: '프로젝트 관리', icon: <Person />, path: '/profile/project' },
            { title: '공통코드 관리', icon: <Person />, path: '/profile/common-code' },
            { title: '사용자 데이터 관리', icon: <Person />, path: '/profile/user-description' },
        ],
    },
];

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const { open, setOpen } = useSidebar();
    const [expandedItems, setExpandedItems] = useState({});

    const handleDrawerToggle = () => {
        setOpen(!open);
        // 사이드바가 접힐 때 모든 메뉴 닫기
        if (open) {
            setExpandedItems({});
        }
    };

    // 자식 메뉴 열기 및 부모 페이지 이동
    const handleMenuClick = (item, index) => {
        if (item.children) {
            // 사이드바가 접혀있으면 먼저 펼치기
            if (!open) {
                setOpen(true);
            }

            setExpandedItems(prev => ({
                ...prev,
                [index]: !prev[index]
            }));
        } else {
            navigate(item.path);
        }
    };

    // 자식 메뉴 페이지 이동
    const handleSubMenuClick = (childItem) => {
        navigate(childItem.path);
    };

    // 현재 페이지에 해당하는 부모 메뉴 Active
    const isMenuActive = (item) => {
        if (item.children) {
            // 자식 메뉴가 있는 경우, 자식 메뉴 중 하나라도 활성화되어 있으면 true
            return item.children.some(child => location.pathname === child.path);
        }
        return location.pathname === item.path;
    };

    // 현재 페이지에 해당하는 부모 메뉴 자동 확장
    useEffect(() => {
        menuItems.forEach((item, index) => {
            if (item.children && item.children.some(child => location.pathname === child.path)) {
                setExpandedItems(prev => ({
                    ...prev,
                    [index]: true
                }));
            } else {
                setExpandedItems({});
            }
        });
    }, [location.pathname]);

    const handleLogout = async () => {
        const accessToken = localStorage.getItem("accessToken");

        try {
            await gateway.post("/auth/logout", {accessToken});
        } catch (e) {
            console.error(e);
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate("/");
        }
    };

    return (
        <StyledDrawer
            variant="permanent"
            open={open}
        >
            {/* Logo & Toggle */}
            <LogoBox open={open}>
                {open ? (
                    <>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                                fontSize: '1.5rem',
                                flex: 1,
                            }}
                        >
                            Admin Panel
                        </Typography>

                        <IconButton
                            onClick={handleDrawerToggle}
                            sx={{
                                color: '#64748b',
                                '&:hover': { backgroundColor: '#f1f5f9' },
                            }}
                        >
                            <Menu />
                        </IconButton>
                    </>
                ) : (
                    <IconButton
                        onClick={handleDrawerToggle}
                        sx={{
                            color: '#64748b',
                            '&:hover': { backgroundColor: '#f1f5f9' },
                        }}
                    >
                        <Menu />
                    </IconButton>
                )}
            </LogoBox>

            <Divider sx={{ backgroundColor: '#e3f2fd' }} />

            {/* Menu List */}
            <Box sx={{
                overflow: 'hidden',
                mt: 1,
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
                    <List>
                        {menuItems.map((item, index) => (
                            <React.Fragment key={index}>
                                <ListItem disablePadding sx={{ display: 'block' }}>
                                    <MenuListItem
                                        onClick={() => handleMenuClick(item, index)}
                                        active={isMenuActive(item)}
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 2 : 'auto',
                                                justifyContent: 'center',
                                                color: isMenuActive(item) ? '#1976d2' : '#64748b',
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.title}
                                            sx={{
                                                opacity: open ? 1 : 0,
                                                '& .MuiListItemText-primary': {
                                                    fontWeight: isMenuActive(item) ? 600 : 500,
                                                    color: isMenuActive(item) ? '#1565c0' : '#374151',
                                                }
                                            }}
                                        />
                                        {item.children && open && (
                                            <Box sx={{ color: '#64748b' }}>
                                                {expandedItems[index] ? <ExpandLess /> : <ExpandMore />}
                                            </Box>
                                        )}
                                    </MenuListItem>
                                </ListItem>

                                {/* Submenu */}
                                {item.children && open && (
                                    <Collapse in={expandedItems[index]} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {item.children.map((child, childIndex) => (
                                                <ListItem key={childIndex} disablePadding>
                                                    <SubMenuListItem
                                                        sx={{ pl: 4 }}
                                                        onClick={() => handleSubMenuClick(child)}
                                                    >
                                                        <ListItemIcon
                                                            sx={{
                                                                minWidth: 0,
                                                                mr: 2,
                                                                color: '#9ca3af',
                                                            }}
                                                        >
                                                            {child.icon}
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={child.title}
                                                            sx={{
                                                                '& .MuiListItemText-primary': {
                                                                    fontSize: '0.875rem',
                                                                    color: '#4b5563',
                                                                }
                                                            }}
                                                        />
                                                    </SubMenuListItem>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Collapse>
                                )}
                            </React.Fragment>
                        ))}
                    </List>
                </Box>

                {/* Logout Section */}
                <Box sx={{ p: 1, borderTop: '1px solid #e3f2fd' }}>
                    <ListItem disablePadding>
                        <LogoutListItem
                            onClick={handleLogout}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 2 : 'auto',
                                    justifyContent: 'center',
                                    color: '#ef4444',
                                }}
                            >
                                <Logout />
                            </ListItemIcon>
                            <ListItemText
                                primary="로그아웃"
                                sx={{
                                    opacity: open ? 1 : 0,
                                    '& .MuiListItemText-primary': {
                                        fontWeight: 500,
                                        color: '#ef4444',
                                    }
                                }}
                            />
                        </LogoutListItem>
                    </ListItem>
                </Box>
            </Box>
        </StyledDrawer>
    );
};