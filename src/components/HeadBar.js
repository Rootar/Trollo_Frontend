import React, {Component} from "react"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import { Button, TextField } from "@material-ui/core";
import axios from "axios";

const styles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    tableButton: {
        marginRight: theme.spacing(2),
        top: "-5px",
        width: "40px",
        height: "40px"
    },
    appBar: {
        width:  "100%",
        height: "50px",
    },
    logoutButton: {
        top: "11px",
    },
    form:{
        position: 'absolute',
        right: '50px',
        top: '-10px'
    },
    inputText:{
    }
}));

function Testing(that){
    if(that.state.login == false){
        return (<form autoComplete="off" noValidate className={styles.form} >
            <TextField name="username" label="Username" value={that.state.username} onChange={that.onChange} className={styles.inputText}/>
            <TextField name="password" label="Password" value={that.state.password} onChange={that.onChange} className={styles.inputText}/>
            <Button variant = "contained" color = "primary" className = { styles.logoutButton } onClick={that.onSubmitLogin}> Login </Button>
            <Button variant = "contained" color = "primary" className = { styles.logoutButton } onClick={that.onSubmitRegister}> Register </Button>
        </form>)
    } else {
        return (<form autoComplete="off" noValidate className={styles.form} >
            <Button variant = "contained" color = "primary" className = { styles.logoutButton } onClick={that.logout}> Logout </Button>
        </form>)
    }
}

function loadContent(){
    axios.get('https://trollo195.herokuapp.com/boards/get')
}

function getBoards()
{
    let config = {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('Token'),
                Accept: "*/*",
                "Content-Type": "application/json"
           }
        }
    
        console.log(sessionStorage.getItem('Token'));

        const response = axios.get({
            URL: 'https://trollo195.herokuapp.com/boards/getBoards',
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('Token'),
            username:this.state.username}
        } )
        response.then((res) => {
            const items = res.data;
            this.setState({
                isLoaded: false,
                items : items,
            });
            console.log(this.items);
        })
    

    // axios.get('https://trollo195.herokuapp.com/boards/getBoards',
    //     {username:this.state.username},
    //     config)
    //         .then(function(response){
    //             console.log("BOARDS: " + response.data) // 
    //         })
    //         .catch(function(error){
    //             console.log("BOARDS ERROR: " + error) // 
    //         })
}

class HeadBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            username:'',
            password:'',
            login: sessionStorage.getItem('Token') ? true : false,
            tableListShow:false
        }
        
        this.onChange = this.onChange.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.onSubmitRegister = this.onSubmitRegister.bind(this);
        this.logout = this.logout.bind(this);
    }

    render(){
        return (
            <div>
                <AppBar 
                    position="static"
                    className = { styles.appBar }
                >            
                    <Toolbar>
                        <IconButton
                            edge = "start"
                            className = { styles.tableButton }
                            onClick = { this.SetTableView }
                            color = "inherit"
                            aria-label = "open drawer"
                        >
                            <TableChartOutlinedIcon />
                        </IconButton>
                        {Testing(this)}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }    

    logout(e){
        sessionStorage.removeItem('Token')
        this.state.login=false
        this.forceUpdate();
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmitLogin(e){
        e.preventDefault();

        console.log("LOGIN STATE: " + this.state);

        axios.post('https://trollo195.herokuapp.com/login', {
            login: this.state.username, 
            password: this.state.password})
                .then(function(response){
                    sessionStorage.setItem('Token', response.headers['authorization']);                    
                })
                .catch(function(error){
                    console.log("LOGIN ERROR: " + error) // dodać później info, że błąd
                })
        
        this.state.login=true
        this.forceUpdate();
    }

    onSubmitRegister(e){
        e.preventDefault();

        console.log("REGISTER STATE: " + this.state);

        axios.post('https://trollo195.herokuapp.com/user/register', {
            login: this.state.username, 
            password: this.state.password})
                .then(function(response){
                    console.log("RESPONSE: " + response) // dodać później info, że się zarejestrowaliśmy
                })
                .catch(function(error){
                    console.log("REGISTER ERROR: " + error) // dodać później info, że błąd
                })
                
        this.forceUpdate();
    }

    SetTableView = () => {
		this.setState({tableListShow: true});
    };
}

export default HeadBar;