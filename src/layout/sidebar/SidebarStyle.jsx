import { Box, Drawer, ListItemButton } from '@mui/material';
import { styled } from '@mui/material/styles';

const drawerWidth = 280;
const drawerClosedWidth = 72;

// 스타일드 컴포넌트
export const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
    width: open ? drawerWidth : drawerClosedWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': {
        width: open ? drawerWidth : drawerClosedWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
        backgroundColor: '#f8faff',
        borderRight: '1px solid #e3f2fd',
        boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
    },
}));

export const LogoBox = styled(Box)(({ theme, open }) => ({
    padding: theme.spacing(2, open ? 3 : 1),
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e3f2fd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    minHeight: 64,
}));

export const MenuListItem = styled(ListItemButton)(({ theme }) => ({
    borderRadius: theme.spacing(1.5),
    margin: theme.spacing(0.5, 1),
    padding: theme.spacing(1.5, 2),
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        backgroundColor: '#e3f2fd',
        '& .MuiListItemIcon-root': {
            color: '#1976d2',
        },
        '& .MuiListItemText-primary': {
            color: '#1565c0',
            fontWeight: 600,
        },
    },
}));

export const SubMenuListItem = styled(ListItemButton)(({ theme }) => ({
    borderRadius: theme.spacing(1),
    margin: theme.spacing(0.25, 2),
    marginLeft: theme.spacing(4),
    padding: theme.spacing(1, 2),
    '&:hover': {
        backgroundColor: '#f3e5f5',
        '& .MuiListItemIcon-root': {
            color: '#7b1fa2',
        },
        '& .MuiListItemText-primary': {
            color: '#6a1b9a',
            fontWeight: 500,
        },
    },
}));

export const LogoutListItem = styled(ListItemButton)(({ theme }) => ({
    borderRadius: theme.spacing(1.5),
    margin: theme.spacing(0.5, 1),
    padding: theme.spacing(1.5, 2),
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        backgroundColor: '#ffebee',
        '& .MuiListItemIcon-root': {
            color: '#d32f2f',
        },
        '& .MuiListItemText-primary': {
            color: '#c62828',
            fontWeight: 600,
        },
    },
}));