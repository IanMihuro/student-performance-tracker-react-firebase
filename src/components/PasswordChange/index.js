import React, { Component } from 'react'

import { withFirebase} from "../Firebase"
import Copyright from '../Copyright'

import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

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

const PasswordChangePage = () => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <VpnKeyOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Change Password
            </Typography>
                <PasswordChangeForm classes={classes} />    
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        
        </Container>
    )
}

const  INITAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null
};

class PasswordChangeFormBase extends Component{
    constructor(props){
        super(props);

        this.state = { ...INITAL_STATE};
    }

    onSubmit = event => {
        const { passwordOne } = this.state;
        const { doPasswordUpdate } = this.props.firebase;

        event.preventDefault();

        doPasswordUpdate(passwordOne)
        .then(()=>{
            this.state({...INITAL_STATE})
        })
        .catch(error=>{
            this.setState({ error })
        })
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render(){
        const { passwordOne, passwordTwo, error } = this.state;
        const isInvalid = passwordOne !== passwordTwo || passwordOne === "";
        const { form, submit, errorText } = this.props.classes;
        return(
            <form className={form} onSubmit={this.onSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
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
                    className={submit}
                >
                    Reset My Password
                </Button>
                {error && <p className={errorText}>{error.message}</p>}
            </form>
        )
    }

}

const PasswordChangeForm = withFirebase(PasswordChangeFormBase);

export default PasswordChangePage;

export { PasswordChangeForm };
