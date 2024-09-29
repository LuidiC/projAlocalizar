import { AccountCircle, Close, Inbox, Mail, Menu } from "@material-ui/icons"
import { AppBar, Divider, Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useState } from "react";
import MenuItemArray from "../menu-lateral/config/MenuItemConfig";
import MenuItemComponent from "../menu-lateral/MenuItemComponent";
import { Sidebar } from "primereact/sidebar";
import { useNavigate } from "react-router-dom";
import React from "react";

export const AppBarTop: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open)
    };

    const closeDrawer = () => {
        setOpen(false)
    }

    const arrayItens = MenuItemArray;

    const history = useNavigate();

    const returnHome = () => {
        history('/home')
    }

    const customIcons = (
        <React.Fragment>
            <button className="p-sidebar-icon p-link mr-2">
                <span className="pi pi-search" />
            </button>
        </React.Fragment>
    );

    const customHeader = (
        <div style={{ padding: '1rem', display: 'flex', alignItems: 'center' }}>
            <AccountCircle style={{ color: "#1976d2", fontSize: '2rem' }} />
            <Typography style={{ marginLeft: '5px', fontSize: '20px' }}>Seja Bem-vindo (a)!</Typography>
        </div>
    );


    return (
        <>
            <Box flex={1} sx={{ padding: 0, margin: 0 }}>
                <AppBar position="fixed" color="primary">
                    <Toolbar>
                        <IconButton
                            onClick={toggleDrawer}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <Menu />
                        </IconButton>
                        <Typography sx={{ cursor: "pointer", flexGrow: 1 }} onClick={returnHome} marginLeft={1} variant="h6" component="div">
                            Sistema Estacionamento
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Sidebar visible={open} onHide={() => setOpen(false)} style={{ backgroundColor: '#fff', padding: 0 }} header={customHeader}>
                    <Divider sx={{marginBottom: '20px'}}/>
                    <List>
                        {MenuItemArray.map((item) => (
                            <ListItem key={item.text} onClick={closeDrawer}>
                                <MenuItemComponent
                                    icone={item.icone}
                                    text={item.text}
                                    link={item.link}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Sidebar>
                <Box
                    sx={{
                        flexGrow: 1,
                        padding: 1,
                        marginTop: (theme) => theme.spacing(8),
                    }}
                >
                    {children}
                </Box>
            </Box>
        </>
    );
}