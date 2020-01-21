import React from 'react'
import { Link } from "react-router-dom"

import SignOutButton from '../SignOut'
import * as ROUTES from '../../constants/routes'
import { AuthUserContext } from '../Session'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    Link: {
        flexGrow: 0.2,
        color: 'white',
        textDecoration: 'none',
        '&:hover': {
            color: 'cyan',
         },
    },
  }));

const Navigation = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
            <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuBookIcon />
            </IconButton>
                <Typography variant="h6" className={classes.title}>
                    REPORT FORM
                </Typography>
                <AuthUserContext.Consumer>
                    { authUser =>
                        authUser ? <NavigationAuth /> : <NavigationNonAuth />
                    }
                </AuthUserContext.Consumer>  
            </Toolbar>
            </AppBar>  
        </div>
    )
}

const NavigationAuth = () => {
    const classes = useStyles();
    return (
    <>

            <Link className={classes.Link} to={ROUTES.LANDING}>Landing</Link>

            <Link className={classes.Link} to={ROUTES.HOME}>Home</Link>

 
            <Link className={classes.Link} to={ROUTES.ACCOUNT}>Account</Link>


            <SignOutButton />

    </>

)};

const NavigationNonAuth = () => {
    const classes = useStyles();
    return (
    <>

   
        <Link className={classes.Link} to={ROUTES.LANDING}>Landing</Link>
    

    <Button color="inherit">
        <Link className={classes.Link} to={ROUTES.SIGN_IN}>Sign In</Link>
    </Button>
    </>

    

)};

export default Navigation
