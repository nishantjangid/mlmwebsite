
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

function FundSection() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'black' }}
                component="nav"
                aria-labelledby="nested-list-subheader"

            >

                <ListItemButton onClick={handleClick}>
                    <SubtitlesIcon sx={{ color: "white", fontSize: "30px", marginRight: '10px' }} />

                    <ListItemText primary="Fund Transfer" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                {/* <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton onClick={() => navigate('AdminTransferFunds')} sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <PeopleIcon sx={{ marginLeft: '-11px', color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Admin Transfer History" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton onClick={() => navigate('FundsTransferHistory')} sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <PeopleIcon sx={{ marginLeft: '-11px', color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Fund Transfer History" />
                        </ListItemButton>
                    </List>
                </Collapse> */}
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton onClick={() => navigate('FundsTransfer')} sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <PeopleIcon sx={{ marginLeft: '-11px', color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Fund Transfer" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton onClick={() => navigate('UserTransferHistory')} sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <PeopleIcon sx={{ marginLeft: '-11px', color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="User Transfer History" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton onClick={() => navigate('AdminTransferFunds')} sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <PeopleIcon sx={{ marginLeft: '-11px', color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Admin Transfer History" />
                        </ListItemButton>
                    </List>
                </Collapse>


            </List>
        </>
    )
}

export default FundSection