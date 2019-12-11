// jeżeli zalogowany to widok tablic, jeżeli wylogowany, to przyciski przenoszące do stron do logowania i rejestracji
import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import PropTypes from 'prop-types'
import {NotificationManager} from 'react-notifications';

const styles = theme => ({
    text:{
        marginTop: "20px"
    }
});

class MainPage extends Component {    
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
        this.loadBoardsList()
    }

    loadBoardsList(){
        if(this.props.isLoggedIn){
            let that = this;
            axios.get('https://trollo195.herokuapp.com/boards/getBoards',{data:{}})
                .then(function(response){
                    // console.log(response)
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
        const {classes} = this.props

        return (
            <Grid container direction="column" justify="center" alignItems="center">                
                <Grid item className={classes.text}><Button variant="contained" color="primary" onClick={this.props.loginPageCallback}>Go to login page</Button></Grid>
                <Grid item className={classes.text}><Button variant="contained" color="primary" onClick={this.props.registerPageCallback}>Go to register page</Button></Grid>
            </Grid>
        )
    }

    whenLoggedIn(){
        // const {classes} = this.props

        return (
            <Grid container direction="column" justify="center" alignItems="center">
                {this.state.boards.map((board) => (
                    <Grid item><div>{board.name}</div><Button variant="contained" color="primary" onClick={() => this.onSubmitGoToBoard(board.boardId)}>Go to board</Button></Grid>                    
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
		axios.post('https://trollo195.herokuapp.com/boards',{            
            name: this.state.boardName
        })
            .then(function(response){
                NotificationManager.success('Name ' + that.state.boardName, 'Creating Board Succeed!');
                that.loadBoardsList()
                that.setState({boardName: ''})
            })
            .catch(function(error){
                console.log("CREATE BOARD ERROR: " + error)
            })
	}

    onChange(e) {
		this.setState({[e.target.name]: e.target.value});
    }

    onSubmitGoToBoard(boardId){
        this.props.boardPageCallback(boardId)
    }
}

MainPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainPage)