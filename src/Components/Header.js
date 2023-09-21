import React, { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import { useNavigate } from 'react-router-dom';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import IncomeReport from './IncomeReport';
import WithdrawReport from './WithdrawReport';
import AvatarMenu from './AvatarMenu';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import UsersSection from './UsersSections';
import FundSection from './FundSection';
import { fetchamount } from './fetchamount';
import DepositFunds from './DepositFunds';
import ActivateId from './ActivateID';
import Investment from './Investment';
import { AuthContext } from '../Context/AuthContext';
const drawerWidth = 240;

function Header(props) {
    const { window } = props;
    const {userDetail} = useContext(AuthContext);    
    const [mobileOpen, setMobileOpen] = useState(false); // Initialize as false
    const drawerRef = useRef(null);
    const [address, setAddress] = useState(false);
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const [isLinkCopied, setIsLinkCopied] = useState(false);
    const [amount, setData] = useState('');

    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const closeDrawer = () => {
        setMobileOpen(false);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                closeDrawer();
            }
        };

        if (mobileOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mobileOpen]);

    const drawer = (
        <div style={{ minHeight: "100vh", backgroundColor: '#272727' }}>
            <Toolbar sx={{ background: 'black', placeContent: 'center' }}>
                {/* <img
                    src={brand}
                    alt="Your Alt Text"
                    style={{ width: '100px', cursor: 'pointer', height: 'auto' }}
                /> */}
            </Toolbar>
            <Divider />
            <List sx={{ color: 'white', background: '#161616' }}>
                <ListItem disablePadding sx={{ display: 'block', padding: '5px', borderBottom: '1px solid #2e2a2a' }} >
                    <ListItemButton
                        onClick={() => navigate("dashboard")}  >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                justifyContent: 'center',
                            }}
                        >
                            <AvTimerIcon sx={{ color: "#d8af72", marginRight: '10px', fontSize: "30px" }} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: 'block', padding: '5px', borderBottom: '1px solid #2e2a2a' }} >
                    <ListItemButton

                        onClick={() => navigate("ProfilePage")}  >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                justifyContent: 'center',
                            }}

                        >
                            <ManageAccountsIcon sx={{ color: "#d8af72", marginRight: '10px', fontSize: "30px" }} />
                        </ListItemIcon>
                        <ListItemText primary=" Profile" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block', borderBottom: '1px solid #2e2a2a' }} >

                    <DepositFunds />

                </ListItem>
                <ListItem disablePadding sx={{ display: 'block', borderBottom: '1px solid #2e2a2a' }} >

                    <Investment />

                </ListItem>
                <ListItem disablePadding sx={{ display: 'block', borderBottom: '1px solid #2e2a2a' }} >

                    <FundSection />

                </ListItem>

                <ListItem disablePadding sx={{ display: 'block', borderBottom: '1px solid #2e2a2a' }} >

                    <UsersSection />

                </ListItem>
                <ListItem disablePadding sx={{ display: 'block', borderBottom: '1px solid #2e2a2a' }} >

                    <IncomeReport />

                </ListItem>

                <ListItem disablePadding sx={{ display: 'block', borderBottom: '1px solid #2e2a2a' }} >

                    <WithdrawReport />

                </ListItem>
                <ListItem disablePadding sx={{ display: 'block', padding: '5px', borderBottom: '1px solid #2e2a2a' }} >
                    <ListItemButton

                        onClick={() => navigate("StackManage")}  >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                justifyContent: 'center',
                            }}

                        >
                            <MoveUpIcon sx={{ color: "#d8af72", marginRight: '10px', fontSize: "30px" }} />
                        </ListItemIcon>
                        <ListItemText primary="Transaction" />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;



    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

   

    return (
        <Box ref={drawerRef} sx={{ background: '#272727', display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    background: 'black',
                    borderBottom: '1px solid white',
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className="wallet-info">
                        <span style={{ marginLeft: '10px' }}>
                            Main Wallet
                        </span>
                        <div className='items-center' style={{ display: "flex", width: '100px', marginLeft: '10px', color: '#d8af72', padding: '5px', borderRadius: '5px', border: '1px solid #d8af72' }} onClick={handleOpenDialog}>
                            <AccountBalanceWalletIcon sx={{ color: '#d8af72', marginRight: "4px" }} />
                            <p>{userDetail.mainWallet}</p>

                        </div>
                    </div>
                    <div className="wallet-info">
                        <span style={{ marginLeft: '10px' }}>
                            Investment
                        </span>
                        <div className='items-center' style={{ display: "flex", width: '100px', marginLeft: '10px', color: '#d8af72', padding: '5px', borderRadius: '5px', border: '1px solid #d8af72' }} onClick={handleOpenDialog}>
                            <AccountBalanceWalletIcon sx={{ color: '#d8af72', marginRight: "4px" }} />
                            <p>{userDetail.investmentWallet}</p>

                        </div>
                    </div>

                </Toolbar>


                <Typography variant="h6" noWrap component="div" sx={{ display: 'flex', alignItems: 'center', fontSize: '0.96rem' }}>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <h5 style={{ color: 'grey' }}>{amount?.username}</h5>
                        <h5 style={{ color: 'grey' }}>{amount?.hashcode}</h5>

                    </div>
                    <AvatarMenu />

                </Typography>


            </AppBar>


            <Box
                component="nav"
                className='h-100'
                sx={{ width: { sm: drawerWidth }, height: "100vh", flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{

                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1, minHeight: "100vh", p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }
                }}
            >
                <Toolbar />

                {props.outlet}

            </Box>
        </Box >
    );
}

Header.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export { Header as default, fetchamount };
