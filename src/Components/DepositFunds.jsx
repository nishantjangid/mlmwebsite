import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PeopleIcon from '@mui/icons-material/People';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function DepositFunds() {
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
                < ArrowBackIcon sx={{ color: "white", fontSize: "30px", marginRight: '10px' }} />
                <ListItemText primary="Deposite Sections" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('AllDeposite')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText sx={{ marginLeft: '10px' }} primary="All Deposite" />
                    </ListItemButton>
                </List>
            </Collapse>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('ApprovedDeposite')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText sx={{ marginLeft: '10px', fontSize: '10px' }} primary="Approved Deposite" />
                    </ListItemButton>
                </List>
            </Collapse>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('PendingDeposite')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText sx={{ marginLeft: '10px' }} primary="Pending Deposite" />
                    </ListItemButton>
                </List>
            </Collapse>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('RejectDeposite')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText sx={{ marginLeft: '10px' }} primary="Reject Deposite" />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
}