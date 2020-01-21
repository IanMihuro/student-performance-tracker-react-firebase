import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import { withFirebase} from "../Firebase"
import * as ROUTES from '../../constants/routes'
import Copyright from '../Copyright'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    errorText: {
        color: 'red',
    }
  }));

const PasswordForgetPage = () => {
    const classes = useStyles();
    return (
    <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <MailOutlineRoundedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Password Forget
            </Typography>
                <PasswordForgetForm classes={classes} />    
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
            
    </Container>
)};

const INITIAL_STATE = {
    email: '',
    error: null
};

class PasswordForgetFormBase extends Component {
    constructor(props){
        super(props)

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const { doPasswordReset } = this.props.firebase;
        const { email } = this.state;
        event.preventDefault();

        doPasswordReset(email)
        .then(()=>{
            this.setState({...INITIAL_STATE})
        })
        .catch(error => {
            this.setState({ error })
        })



    }
    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render(){
        const { email, error } = this.state;
        const isInvalid = email === '';
        const {form, submit, errorText} = this.props.classes;

        return(
            <form className={form} onSubmit={this.onSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="email"
                    placeholder="Email Address"
                    autoComplete="email"
                    autoFocus
                />
                <Button 
                    disabled={isInvalid} 
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={submit}
                >
                    Reset My Password
                </Button>
                {error && <p className={errorText}>{error.message}</p>}
            </form>

        )
    }
}

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
)

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink }; 