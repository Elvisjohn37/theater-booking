"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Avatar,
    Menu,
    MenuItem,
    Container,
    Paper,
    Card,
    CardContent,
    useTheme,
    useMediaQuery,
    // IMPORT THE OLD GRID HERE
    Grid,
} from "@mui/material"
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    Person as PersonIcon,
    School as SchoolIcon,
    ExitToApp as LogoutIcon,
    Notifications as NotificationsIcon,
    ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material"
import { logoutAction } from "@/app/actions"

const drawerWidth = 260

export default function DashboardUI() {
    const router = useRouter()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const [open, setOpen] = useState(!isMobile)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleDrawerToggle = () => setOpen(!open)
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(event.currentTarget)
    const handleMenuClose = () => setAnchorEl(null)

    const handleLogout = async () => {
        try {
            await logoutAction()
            router.refresh()
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    const menuItems = [
        { text: "Dashboard", icon: <DashboardIcon />, active: true },
        { text: "Book Facility", icon: <PersonIcon />, active: false },
        { text: "My Reservations", icon: <PersonIcon />, active: false },
    ]

    const drawerContent = (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: [1],
                }}
            >
                <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: 800, ml: 1 }}
                >
                    UniPortal
                </Typography>
                {isMobile && (
                    <IconButton onClick={handleDrawerToggle}>
                        <ChevronLeftIcon />
                    </IconButton>
                )}
            </Toolbar>
            <Divider />
            <List sx={{ flexGrow: 1, px: 1, mt: 1 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                        <ListItemButton
                            selected={item.active}
                            sx={{
                                borderRadius: 2,
                                "&.Mui-selected": {
                                    bgcolor: "primary.main",
                                    color: "white",
                                    "&:hover": { bgcolor: "primary.dark" },
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: item.active ? "white" : "inherit",
                                    minWidth: 40,
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontWeight: item.active ? 600 : 400,
                                    fontSize: "0.9rem",
                                    color: item.active ? "white" : "inherit",
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List sx={{ px: 1 }}>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={handleLogout}
                        sx={{ borderRadius: 2, color: "error.main" }}
                    >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <LogoutIcon color="error" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Logout"
                            primaryTypographyProps={{ fontSize: "0.9rem" }}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8f9fa" }}>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    bgcolor: "white",
                    color: "text.primary",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        sx={{ flexGrow: 1, fontWeight: 700 }}
                    >
                        Dashboard
                    </Typography>
                    <IconButton color="inherit" sx={{ mr: 1 }}>
                        <NotificationsIcon />
                    </IconButton>
                    <Box
                        onClick={handleMenuOpen}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            gap: 1.5,
                        }}
                    >
                        <Avatar
                            sx={{
                                bgcolor: "primary.main",
                                width: 32,
                                height: 32,
                            }}
                        >
                            E
                        </Avatar>
                        {!isMobile && (
                            <Typography variant="subtitle2" fontWeight={600}>
                                Elvis John
                            </Typography>
                        )}
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>
                            My Profile
                        </MenuItem>
                        <Divider />
                        <MenuItem
                            onClick={handleLogout}
                            sx={{ color: "error.main" }}
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Drawer
                variant={isMobile ? "temporary" : "persistent"}
                open={open}
                onClose={handleDrawerToggle}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Container maxWidth="lg">
                    {/* BACK TO OLD GRID SYNTAX */}
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper
                                sx={{
                                    p: 4,
                                    borderRadius: 4,
                                    background:
                                        "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                                    color: "white",
                                }}
                            >
                                <Typography variant="h4" fontWeight={800}>
                                    Welcome, Elvis!
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ opacity: 0.8, mt: 1 }}
                                >
                                    BSIT - 1st Year
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}
