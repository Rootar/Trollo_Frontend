// jeżeli zalogowany to widok tablic, jeżeli wylogowany, to przyciski przenoszące do stron do logowania i rejestracji
import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import PropTypes from 'prop-types'
import {NotificationManager} from 'react-notifications';
import EditIcon from '@material-ui/icons/Edit';
import Popup from "reactjs-popup";

const styles = theme => ({
    text:{
        marginTop: "20px"
    },
    editicon:{
        marginTop: "20px",
        marginLeft: "10px"
    },
    modal:{
        size: "12px"
    },
    header:{
        width: "100%",
        size: "18px",
        align: "center",
        padding: "5px",
    },
    content:{
        width: "100%",
        padding: "10px 5px"
    },
    actions:{
        width: "100%",
        padding: "10px 5px",
        margin: "auto",
        align: "center"
    },
    close:{
        cursor: "pointer",
        position: "absolute",
        display: "block",
        padding: "2px 5px",
        right: "-10px",
        top: "-10px",
        size: "24px",
        background: "#ffffff",
        border: "1px solid #cfcece",
    }
});

class MainPage extends Component {    
	constructor(props){
		super(props);

		this.onChange = this.onChange.bind(this);
        this.onSubmitCreateBoard = this.onSubmitCreateBoard.bind(this);
        this.setBoardName = this.setBoardName.bind(this);
    }
    
    state = {
        boardName: '',
        boards: [],
        newBoardName: '',
        newBoardId: 0
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
                    NotificationManager.error(error.response.data, 'Loading boards list Failed!')
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
        const {classes} = this.props

        return (
            <Grid container direction="column" justify="center" alignItems="center">
                {this.state.boards.map((board) => (
                    <Grid item><div>{board.name}</div><Button variant="contained" color="primary" onClick={() => this.onSubmitGoToBoard(board.boardId)}>Go to board</Button>
                            <Popup
                                trigger={<button className="button"> <EditIcon/> </button>}
                                modal>
                                {close => (
                                    <div className={classes.modal}>
                                        <a className={classes.close} onClick={close}>
                                            &times;
                                        </a>
                                        <div className={classes.header}> {board.name} </div>
                                            <div className={classes.content}>
                                                {" "}
                                                <input onChange={ this.setBoardName } type="text" placeholder="type board name... " />
                                            </div>
                                            <div className={classes.actions}>
                                                <button
                                                    className="button"
                                                    onClick={() => {
                                                        this.onSetBoardName(board.boardId, this);
                                                        close();
                                                    }}>
                                                    Save
                                                </button>
                                                <button
                                                    className="button"
                                                    onClick={() => {
                                                        close();
                                                    }}>
                                                    Cancel
                                                </button>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                    </Grid>                    
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

    setBoardName(e) {
        this.setState({newBoardName: e.target.value});
        // e.target.value is the text from our input
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
                NotificationManager.error(error.response.data, 'Creating board faild!')
            })
	}

    onChange(e) {
		this.setState({[e.target.name]: e.target.value});
    }

    onSubmitGoToBoard(boardId){
        this.props.boardPageCallback(boardId)
    }

    onSetBoardName(boardId, that){
		axios.patch('https://trollo195.herokuapp.com/boards/changeName/' + boardId,{            
            name: that.state.newBoardName
        })
            .then(function(response){
                NotificationManager.success(that.state.newBoardName, 'Changed Name Succeed!');
                that.loadBoardsList()
                //that.setState({newBoardName: ''})
            })
            .catch(function(error){
                NotificationManager.error(error.response.data, 'Change board name faild!')
            })
    }
}

MainPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainPage)