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
    Grid,
    Paper,
    Card,
    CardContent,
    useTheme,
    useMediaQuery,
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
import { logoutAction } from "@/app/actions" // Import the action

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

    // ... inside the component ...
    const handleLogout = async () => {
        try {
            // 1. Call the server action to delete the cookie
            await logoutAction()

            // 2. Refresh the current route (/)
            // The server will re-run app/page.tsx, see the cookie is gone,
            // and swap back to the LoginForm automatically.
            router.refresh()
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    const menuItems = [
        { text: "Dashboard", icon: <DashboardIcon />, active: true },
        { text: "My Profile", icon: <PersonIcon />, active: false },
        { text: "Academics", icon: <SchoolIcon />, active: false },
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
            <List sx={{ flexGrow: 1, px: 1 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                            selected={item.active}
                            sx={{
                                borderRadius: 2,
                                "&.Mui-selected": {
                                    bgcolor: "primary.light",
                                    color: "primary.main",
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: item.active
                                        ? "primary.main"
                                        : "inherit",
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontWeight: item.active ? 600 : 400,
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
                        <ListItemIcon>
                            <LogoutIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f0f2f5" }}>
            {/* Navbar */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    bgcolor: "white",
                    color: "text.primary",
                    boxShadow: "0 1px 10px rgba(0,0,0,0.05)",
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
                            gap: 1,
                        }}
                    >
                        <Avatar
                            sx={{
                                bgcolor: "primary.main",
                                width: 35,
                                height: 35,
                            }}
                        >
                            E
                        </Avatar>
                        {!isMobile && (
                            <Typography variant="body2" fontWeight={600}>
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
                        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
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

            {/* Sidebar (Responsive) */}
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
                        borderRight: "none",
                        boxShadow: "2px 0 10px rgba(0,0,0,0.03)",
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    transition: theme.transitions.create("margin", {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    ...(open &&
                        !isMobile && {
                            marginLeft: 0,
                        }),
                }}
            >
                <Toolbar /> {/* Spacer for the fixed AppBar */}
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        {/* Header Card */}
                        <Grid item xs={12}>
                            <Paper
                                sx={{
                                    p: 4,
                                    borderRadius: 4,
                                    background:
                                        "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                                    color: "white",
                                    boxShadow:
                                        "0 8px 20px rgba(25, 118, 210, 0.2)",
                                }}
                            >
                                <Typography variant="h4" fontWeight={700}>
                                    Welcome, Elvis!
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ opacity: 0.9, mt: 1 }}
                                >
                                    Bachelor of Science in Information
                                    Technology (1st Year)
                                </Typography>
                            </Paper>
                        </Grid>

                        {/* Quick Stats */}
                        {[
                            {
                                label: "Attendance",
                                value: "94%",
                                color: "#4caf50",
                            },
                            {
                                label: "Pending Tasks",
                                value: "5",
                                color: "#ff9800",
                            },
                            {
                                label: "Messages",
                                value: "12",
                                color: "#2196f3",
                            },
                        ].map((stat) => (
                            <Grid item xs={12} sm={4} key={stat.label}>
                                <Card
                                    sx={{
                                        borderRadius: 3,
                                        boxShadow:
                                            "0 4px 12px rgba(0,0,0,0.05)",
                                    }}
                                >
                                    <CardContent sx={{ textAlign: "center" }}>
                                        <Typography
                                            color="text.secondary"
                                            variant="overline"
                                            fontWeight={700}
                                        >
                                            {stat.label}
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            fontWeight={800}
                                            sx={{ color: stat.color }}
                                        >
                                            {stat.value}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}

                        {/* Info Sections */}
                        <Grid item xs={12} md={8}>
                            <Paper
                                sx={{ p: 3, borderRadius: 3, minHeight: 400 }}
                            >
                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                    gutterBottom
                                >
                                    Recent Announcements
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Box
                                    sx={{
                                        p: 5,
                                        textAlign: "center",
                                        color: "text.secondary",
                                    }}
                                >
                                    <Typography>
                                        No announcements today. Check back
                                        later!
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Paper
                                sx={{ p: 3, borderRadius: 3, minHeight: 400 }}
                            >
                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                    gutterBottom
                                >
                                    Quick Actions
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <List>
                                    {[
                                        "View Schedule",
                                        "Enrollment Status",
                                        "Grade Portal",
                                    ].map((text) => (
                                        <ListItem
                                            key={text}
                                            disablePadding
                                            sx={{ mb: 1 }}
                                        >
                                            <ListItemButton
                                                sx={{
                                                    bgcolor: "#f8f9fa",
                                                    borderRadius: 2,
                                                }}
                                            >
                                                <ListItemText primary={text} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}
