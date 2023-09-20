import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';

export default function UsersSection() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'black' }}
            component="nav"
            aria-labelledby="nested-list-subheader"

        >

            <ListItemButton onClick={handleClick}>
                <SubtitlesIcon sx={{ color: "white", fontSize: "30px", marginRight: '10px' }} />

                <ListItemText primary="User Section " />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('AllUsers')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ marginLeft: '-11px', color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary="All Users" />
                    </ListItemButton>
                </List>
            </Collapse>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('AllActiveUSers')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ marginLeft: '-11px', color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary="Active Users" />
                    </ListItemButton>
                </List>
            </Collapse>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('AllInActiveUsers')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ marginLeft: '-11px', color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary=" In-Active Users" />
                    </ListItemButton>
                </List>
            </Collapse>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('BlockUsers')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ marginLeft: '-11px', color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary=" Block Users" />
                    </ListItemButton>
                </List>
            </Collapse>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('MyDirectTeam')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ marginLeft: '-11px', color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary=" My Direct Team" />
                    </ListItemButton>
                </List>
            </Collapse>

            {/* <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('DirectMembers')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ marginLeft: '-11px', color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary="Direct Members" />
                    </ListItemButton>
                </List>
            </Collapse> */}

            {/* <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('Renewusers')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ marginLeft: '-11px', color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary="My Renew" />
                    </ListItemButton>
                </List>
            </Collapse> */}
        </List>
    );
}