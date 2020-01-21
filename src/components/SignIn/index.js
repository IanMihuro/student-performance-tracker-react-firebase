import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { SignUpLink} from '../SignUp'
import { withFirebase} from '../Firebase'
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
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    errorText: {
        color: 'red',
    },
    gridStyling: {
        alignItems: 'center'
    }
  }));

const SignInPage = () => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign in
            </Typography>
                <SignInForm classes={classes} />
                <Grid container className={classes.gridStyling}>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password? {/* TODO: change to component */}
                        </Link>
                    </Grid>
                    <Grid item >
                        <SignUpLink classes={classes} />
                    </Grid>
                </Grid>
                
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
            
        </Container>
    )
}

const  INITAL_STATE = {
    email: '',
    password: '',
    error: null
}

class SignInFormBase extends Component {
    constructor(props){
        super(props)

        this.state = {...INITAL_STATE}
    }

    onSubmit = event => {
        event.preventDefault()

        const { email, password} = this.state;

        this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(()=>{
            this.setState({ ...INITAL_STATE});
            this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
            this.setState({ error: error});
        })
    }
    
    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        const { email, password, error } = this.state;
        const isInvalid = password === "" || email === "";
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
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                />
                <Button 
                    disabled={isInvalid} 
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={submit}
                >
                    Sign In
                </Button>

                {error && <p className={errorText}>{error.message}</p>}
            </form>
        )
    }
}

const SignInLink = () => (
    <p>
        Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </p>
)

const SignInForm = compose(
    withRouter,
    withFirebase
)(SignInFormBase);

export default SignInPage;

export {SignInForm, SignInLink}
