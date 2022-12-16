import React from 'react'
import { Box, CssBaseline, Toolbar, Drawer, ListItem, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

const drawerWidth = 240;

const CDrawer = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Toolbar>

            </Toolbar>
            <Box sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders">
                <Drawer

                    variant="permanent"
                    sx={{
                        marginTop: 20,

                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, zIndex: 0, },
                    }}
                    open
                >
                    <List sx={{ pt: 3, marginTop: 5 }}>
                        {['Dashboard', 'User', 'Setting'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Box>
            CDrawer</Box>
    )
}

export default CDrawer