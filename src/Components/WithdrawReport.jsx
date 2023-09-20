import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';



// profile, activate idea, profie area, change apssword and AllActiveUSers, transactions, contact us 
export default function WithdrawReport() {

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
                <AccountBalanceIcon sx={{ color: "#d8af72", fontSize: "30px", marginRight: '10px' }} />
                <ListItemText primary="Withdraw Request" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>



            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('SendRequest')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText sx={{ fontSize: '10px' }} primary="Send Request" />
                    </ListItemButton>
                </List>
            </Collapse>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('WalletHistory')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText sx={{ fontSize: '10px' }} primary=" Wallet History" />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
}