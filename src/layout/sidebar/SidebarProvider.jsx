import React, {createContext, useContext, useState} from "react";

const drawerWidth = 280;
const drawerClosedWidth = 72;

// Context for sidebar state
const SidebarContext = createContext();

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};

// SidebarProvider 컴포넌트
export const SidebarProvider = ({ children }) => {
    const [open, setOpen] = useState(true);

    return (
        <SidebarContext.Provider value={{ open, setOpen, drawerWidth, drawerClosedWidth }}>
            {children}
        </SidebarContext.Provider>
    );
};