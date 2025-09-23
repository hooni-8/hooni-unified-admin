import React from 'react';
import Router from "@nav/Router";

import { CssBaseline, Box } from '@mui/material';

import Sidebar from "@layout/sidebar/Sidebar";
import {SidebarProvider} from "@layout/sidebar/SidebarProvider";

export default function DashBoard() {

    return (
        <SidebarProvider>
            <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
                <CssBaseline />
                <Sidebar />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        bgcolor: '#f8fafc',
                        minHeight: '100vh',
                        overflow: 'hidden',
                        transition: (theme) => theme.transitions.create('margin', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                        p: 3,
                    }}
                >
                    <Router />
                </Box>
            </Box>
        </SidebarProvider>
    )
}
