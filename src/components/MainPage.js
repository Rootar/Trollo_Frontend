// jeżeli zalogowany to widok tablic, jeżeli wylogowany, to przyciski przenoszące do stron do logowania i rejestracji
import React, {Component} from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';

// var useStyles = makeStyles(theme => ({
//     text:{
//         marginTop: "20px"
//     }
// }));

class RegisterPage extends Component {    
	constructor(props){
		super(props);

		this.onChange = this.onChange.bind(this);
        this.onSubmitCreateBoard = this.onSubmitCreateBoard.bind(this);
    }
    
    state = {
        boardName: '',
        boards: []
    }

    componentDidMount() {
        if(this.props.isLoggedIn){
            let that = this;
            Axios.get('https://trollo195.herokuapp.com/boards/getBoards',{
                headers: {
                    'Authorization': sessionStorage.getItem('Token')
                },
                data: {}
            })
                .then(function(response){
                    that.setState({boards: response.data.boards})
                })
                .catch(function(error){
                    console.log("CREATE BOARD ERROR: " + error)
                })
        }
    }
        
    render(){
        if(this.props.isLoggedIn){
            return this.whenLoggedIn()
        }else{
            return this.whenLoggedOut()
        }
    }

    whenLoggedOut(){
        return (
            <Grid container direction="column" justify="center" alignItems="center">                
                <Grid item><Button variant="contained" color="primary" onClick={this.props.loginPageCallback}>Go to login page</Button></Grid>
                <Grid item><Button variant="contained" color="primary" onClick={this.props.registerPageCallback}>Go to register page</Button></Grid>
            </Grid>
        )
    }

    whenLoggedIn(){
        return (
            <Grid container direction="column" justify="center" alignItems="center">
                {this.state.boards.map((board) => (
                    <Grid item><div>{board.name}</div><Button variant="contained" color="primary" onClick={() => this.onSubmitGoToBoard(board.name)}>Go to board</Button></Grid>                    
                ))}      

                <Grid direction="row" item container justify="center" alignItems="center">
                    <form noValidate autoComplete="off">
                        <Grid item><TextField id="outlined-basic" label="Board Name" name="boardName" onChange={this.onChange} value = {this.state.boardName}/></Grid>
                        <Grid item align="center">
                            <Button variant="contained" color="primary" onClick={this.onSubmitCreateBoard}>Create Board</Button>
                        </Grid>
                    </form>
                </Grid>
            </Grid>            
        )
    }

    onSubmitCreateBoard(e)
	{
        let that = this
		Axios.post('https://trollo195.herokuapp.com/boards',{            
            name: this.state.boardName
        },{
            headers: {
                'Authorization': sessionStorage.getItem('Token')
            }
        })
            .then(function(response){
                that.setState({boardName: ''})
            })
            .catch(function(error){
                console.log("CREATE BOARD ERROR: " + error)
            })
	}

    onChange(e) {
		this.setState({[e.target.name]: e.target.value});
    }

    onSubmitGoToBoard(e){
        console.log(e)
    }
}

export default RegisterPage