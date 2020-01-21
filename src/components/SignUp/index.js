import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { SignInLink } from '../SignIn'

import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import Copyright from '../Copyright'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
    Form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    Submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


const SignUpPage = () => {
    const classes = useStyles();
    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <SignUpForm classes={classes} />
                <Grid container justify="flex-end">
                    <Grid item>
                        <SignInLink />
                    </Grid>
                </Grid>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
            
        </Container>
)};

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
};

class SignUpFormBase extends Component {
    constructor(props){
        super(props)

        this.state = { ...INITIAL_STATE };

        this.onSubmit = this.onSubmit.bind(this);
    }

     onSubmit = event => {
        event.preventDefault();

        const {email, passwordOne} = this.state;
        const { firebase } = this.props

        firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            this.setState({...INITIAL_STATE})
            this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
            this.setState({ error })
        });

        
    }

    onChange = event => {
    this.setState({[event.target.name]: event.target.value});
    }

    render(){
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error
        } = this.state;

        const isInvalid = passwordOne !== passwordTwo ||
                            passwordOne === '' ||
                            email === '' ||
                            username === '';
        const {Form, Submit} = this.props.classes;
        return (
            <form className={Form} onSubmit={this.onSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            name="username"
                            value={username}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Full Name"
                            autoComplete="fullname" 
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            value={email}
                            onChange={this.onChange}
                            type="email"
                            placeholder="Email Address" 
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="passwordOne"
                            name="passwordOne"
                            value={passwordOne}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Password"
                            autoComplete="password" 
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="passwordTwo"
                            name="passwordTwo"
                            value={passwordTwo}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Confirm Password" 
                            autoComplete="confirm-password"
                        />
                    </Grid>
                </Grid>
                <Button 
                    disabled={isInvalid} 
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={Submit}
                >
                    Sign Up
                </Button>
                {error && <p>{error.message}</p>}
            </form>
        )
    }
    
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
)

const SignUpForm = compose(
    withRouter,
    withFirebase
)(SignUpFormBase);

export default SignUpPage;

export {SignUpForm, SignUpLink};
