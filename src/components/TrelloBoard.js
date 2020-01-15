import React, {Component} from 'react';
import Board from 'react-trello'
import { withStyles } from '@material-ui/core/styles';

import { connect } from "react-redux";
import { addLane, clear, changeLaneName, addCard, changeCardName, addComment, addAttachment, changeComment} from "../actions";
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import Popup from "reactjs-popup";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import { debuglog } from 'util';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
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
    },
    attContent: {
        display: "none",
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    upload:{

    }
});

class TrelloBoard extends Component {
    
    componentDidMount(){
        this.props.clear()
        loadLanessList(this.props.boardId, this);
        
        this.setCommentContent = this.setCommentContent.bind(this);
        this.setUploadContent = this.setUploadContent.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    state = {
        finish: false,
        popupOpen: false,
        currentCard: 0,
        currentLane: 0,
        commentContent: '',
        attachmentName: '',
        attachmentContent: '',
        time: '2017-05-24T10:30:00',
        currentCardIndex: 0,
        currentLaneIndex: 0,
    }
  
    render(){
        const {classes} = this.props

        let lanes = {
            lanes: this.props.lanes
        }

        // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

        // const handleDateChange = date => {
        //     setSelectedDate(date);
        // };

        return (
            <div>
            <Board
                data={lanes}
                draggable={true}
                editable={true}
                editLaneTitle={true}
                canAddLanes={true}
                collapsibleLanes={true}
                handleDragStart={handleDragStartEvent}
                handleDragEnd={handleDragEndEvent} 
                handleLaneDragStart={handleLaneDragStartEvent} 
                handleLaneDragEnd={ (removedIndex, addedIndex, payload) => handleLaneDragEndEvent(removedIndex, addedIndex, payload, this)}
                onDataChange={onDataChangeEvent}
                onCardClick={(cardId, metadata, laneId) => onCardClickEvent(cardId, metadata, laneId, this)}
                onCardAdd={(card, laneId) => onCardAddEvent(card, laneId, this)}
                onCardDelete={onCardDeleteEvent}
                onCardMoveAcrossLanes={onCardMoveAcrossLanesEvent}
                onLaneAdd={(params) => onLaneAddEvent(params, this.props.boardId, this)}
                onLaneDelete={onLaneDeleteEvent}
                onLaneUpdate={(laneId, data) => onLaneUpdateEvent(laneId, data, this)}
                onLaneClick={onLaneClickEvent}
                onLaneScroll={onLaneScrollEvent}
            />
            <Popup open={this.state.popupOpen}  onClose={() => onClosePopupEvent(this)}>                
                {close => (
                    <div className="modal">
                        <a className={classes.close} onClick={close}>&times;</a>
                        <div>
                            <form className={classes.container} noValidate>
                                <TextField
                                    id="datetime-local"
                                    label="Next appointment"
                                    type="datetime-local"
                                    defaultValue="2017-05-24T10:30:00"
                                    value = {this.state.time}
                                    className={classes.textField}
                                    name='time'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange = {this.onChange}
                                />
                            </form>
                        </div>
                        <div className={classes.header}> {lanes.lanes[this.state.currentLaneIndex].cards[this.state.currentCardIndex].name}</div>
                        <div className={classes.content}>
                            {" "}
                            <br/>
                            OPIS:
                            <br />
                            {lanes.lanes[this.state.currentLaneIndex].cards[this.state.currentCardIndex].description}
                        </div>
                        {lanes.lanes[this.state.currentLaneIndex].cards[this.state.currentCardIndex].attachments.map((attachment) => (
                            <div className="attachement">
                                {attachment.name}
                                <button className="button" onClick={() => { downloadAttachemnt(attachment.name, attachment.content, this); }}> <GetAppIcon/> </button>
                                <button className="button" onClick={() => { removeAttachment(attachment.id, this); }}> <DeleteIcon/> </button>
                            </div>
                        ))}
                        <div id="attachementContent" className={classes.attContent}></div>
                        <div className={classes.upload}>
                            <Popup
                                trigger={<button className="button"> Upload </button>} modal>
                                {close => (
                                    <div className="model">
                                        <a className={classes.close} onClick={close}>&times;</a>
                                        <div className={classes.content}>{" "} <input id="files" onChange={ this.setUploadContent } type="file"/></div>
                                        <div className={classes.actions}>
                                            <button className="button" onClick={() => { createAttachement(this.state.currentCard, this.state.attachmentName, document.getElementById('attachementContent').textContent, this); close(); }}> Send </button>
                                            <button className="button" onClick={() => { close(); }}> Cancel </button>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                        </div>
                        <div>
                            <Popup
                                trigger={<button className="button"> Comment </button>} modal>
                                {close => (
                                    <div className="model">
                                        <a className={classes.close} onClick={close}>&times;</a>
                                        <div className={classes.content}>{" "}<input onChange={ this.setCommentContent } type="text" placeholder="type comment... " /></div>
                                        <div className={classes.actions}>
                                            <button className="button" onClick={() => { createComment(this.state.currentCard, this.state.commentContent, this); close(); }}> Send </button>
                                            <button className="button" onClick={() => { close(); }}> Cancel </button>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                        </div>
                        {lanes.lanes[this.state.currentLaneIndex].cards[this.state.currentCardIndex].comments.map((comment) => (
                            <div className="comment">
                                {comment.content}
                                <br/>
                                <Popup
                                    trigger={<button className="button"> <EditIcon/> </button>} modal>
                                    {close => (
                                        <div className="model">
                                            <a className={classes.close} onClick={close}>&times;</a>
                                            <div className={classes.content}>{" "}<input onChange={ this.setCommentContent } type="text" placeholder="type comment... " /></div>
                                            <div className={classes.actions}>
                                                <button className="button" onClick={() => { setComment(comment.id, this.state.commentContent, this); close(); }}> Send </button>
                                                <button className="button" onClick={() => { close(); }}> Cancel </button>
                                            </div>
                                        </div>
                                    )}
                                </Popup>
                            </div>
                        ))}
                    </div>
                    
                )}
            </Popup>
            </div>
        );
    }

    setCommentContent(e) {
        this.setState({commentContent: e.target.value})
        // e.target.value is the text from our input
    }

    setUploadContent(e) {
        var name = e.target.value.split("\\");
        this.setState({attachmentName: name[name.length - 1]})
        //console.log(name[name.length - 1])

        var files = document.getElementById('files').files;
        if (!files.length) {
            alert('Please select a file!');
            return;
        }

        var file = files[0];

        var reader = new FileReader();

        reader.onloadend = function(e) {
            if (e.target.readyState == FileReader.DONE) {
                document.getElementById('attachementContent').textContent = e.target.result;
                //that.setState({attachmentContent: e.target.result})
            }
        };

        reader.readAsBinaryString(file)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
        console.log(e.target.value);
        
        axios.patch('https://trollo195.herokuapp.com/tasks/edit', {
            taskId: this.state.currentCard,
            description: /* tutaj trzeba czegoś mondrego lol - opis karty */null,
            date: e.target.value + ':00'
        })
            .then(function(response){
                NotificationManager.success('temporary', 'temporary!');
            })
            .catch(function(error){
                NotificationManager.error('', 'temporary!')

                console.log(error)
            })
    }

}
  

// const onTimeChange = (that) => {
//     console.log('ZMIANA CZASU')
//     that.setState({'time': })
// }

const mapStateToProps = (state) => ({
    lanes: state.lanes
})

const mapDispatchToProps = (dispatch) => ({
    clear: () => dispatch(clear()),
    addLane: (title, laneId) => dispatch(addLane(title, laneId)),
    changeLaneName: (title, laneId) => dispatch(changeLaneName(title, laneId)),
    addCard: (description, laneId, cardId) => dispatch(addCard(description, laneId, cardId)),
    changeCardName: (title, laneId, cardId) => dispatch(changeCardName(title, laneId, cardId)),
    // deleteLane: id => dispatch(deleteLane(id))

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //zawartość karty
    addComment: (content, commentId, cardId, laneId) => dispatch(addComment(content, commentId, cardId, laneId)),
    addAttachment: (name, content, attachementId, cardId, laneId) => dispatch(addAttachment(name, content, attachementId, cardId, laneId)),
    changeComment: (content, commentId, cardId, laneId) => dispatch(changeComment(content, commentId, cardId, laneId))
})

/////////////////////////////////////////////////////////////////////// 

const loadLanessList = async(boardId, that) => {
    axios.get('https://trollo195.herokuapp.com/boards/getBoard/' + boardId,{data:{}})
        .then(function(response){
            console.log(response)
            response.data.taskLists.sort((a, b) => a.position - b.position);
            response.data.taskLists.map((taskList) => (
                that.props.addLane(taskList.name, taskList.taskListId)))
        })
        .catch(function(error){
            console.log("CREATE BOARD ERROR: " + error)
            NotificationManager.error('', 'Load board Faild!')
        })
    loadTaskList(boardId, that)
}
// może później wywale to do innych funkcji. na razie lisp xD i tak pewnie api będzie zmieniane, bo do załadowania tablicy potrzeba liczba_kolumn+liczba_zadań*2+1 zapytań xD
const loadTaskList = (boardId, that) => {
    axios.get('https://trollo195.herokuapp.com/taskLists/getByBoard/' + boardId,{data:{}}) // taskLists.name/taskListId/tasks[{id}]
        .then(function(response){ //dostajemy w sumie tylko id zadań #nosense
            console.log("LISTA ZADAŃ" + response)
            console.log(response)
            response.data.taskLists.map((taskList) => ( // pojedyńcza kolumna
                    taskList.tasks.map((taskId) => ( // pojedyńcze id zadania
                            // console.log("id " +taskId)
                            axios.get('https://trollo195.herokuapp.com/tasks/get/' + taskId, {data:{}}) // dostajemy zadanie: taskId, taskListId, description
                                .then(function(response){
                                    that.props.addCard(response.data.description, response.data.taskListId, response.data.taskId)
                                    loadCommentsList(taskList.taskListId, taskId, response.data.comments, that);
                                    loadAttachmentsList(taskList.taskListId, taskId, response.data.attachments, that);
                                    that.setState({'finish':true})
                                })
                                .catch(function(error){
                                    NotificationManager.error('', 'Get task info Faild!')

                                    console.log("GET TASK INFO ERROR: " + error)
                                    console.log(error)
                                })
                        ) 
                    )
                )
            )
        })
        .catch(function(error){
            NotificationManager.error('', 'Get task lists Faild!')

            console.log("GET TASK LISTS ERROR: " + error)
        })
}

const loadCommentsList = (listId, cardId, comments, that) => {
    comments.map((comment) => {
        getComment(cardId, listId, comment, that)
    })
}

const loadAttachmentsList = (listId, cardId, attachments, that) => {
    attachments.map((attachmentId) => {
        getAttachment(cardId, listId, attachmentId.attachmentId, that)
    })
}

/////////////////////////////////////////////////////////////////////// EVENTS



const handleDragStartEvent = (cardId, laneId) => {
    console.log('EVENT: handleDragStartEvent')
}

const handleDragEndEvent = (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
    console.log('EVENT: handleDragEndEvent')
}

const handleLaneDragStartEvent = (laneId) => {
    console.log('EVENT: handleLaneDragStartEvent')
}

const handleLaneDragEndEvent = (removedIndex, addedIndex, payload, that) => {
    console.log('EVENT: handleLaneDragEndEvent')
    console.log("From:" + removedIndex);
    console.log("To: " + addedIndex);
    console.log(payload);

    let lanes = that.props.lanes;

    let offset = Math.min(removedIndex, addedIndex);
    let direction = removedIndex - addedIndex; // < 0: right, > 0: left
    let changed = [];
    if(direction > 0) {
        changed.push(lanes[removedIndex]);
        for(let i = addedIndex; i < removedIndex; ++i)
            changed.push(lanes[i]);
    }
    else if(direction < 0) {
        for(let i = removedIndex + 1; i <= addedIndex; ++i)
            changed.push(lanes[i]);
        changed.push(lanes[removedIndex]);
    }

    let newOrder = 
        lanes.slice(0, Math.min(addedIndex, removedIndex))
        .concat(changed)
        .concat(lanes.slice(Math.max(addedIndex, removedIndex) + 1));
    sendLaneChangePositionRequest(newOrder, that.props.boardId);

}

function sendLaneChangePositionRequest(newOrder, boardId) {
    console.log("New order:")
    console.log(newOrder);
    let address = "https://trollo195.herokuapp.com/taskLists/" + boardId + "/changePositions";
    let body = [];
    console.log("address: " + address);
    newOrder.forEach((lane, index) => body.push({taskListId: lane.id, position: index}));
    console.log(body);
    axios.patch(address, body).then((response) => console.log(response));
}

const onDataChangeEvent = (newData) => {
    console.log('EVENT: onDataChangeEvent')
    // console.log(newData)
}

const onCardClickEvent = (cardId, metadata, laneId, that) => {
    console.log('EVENT: onCardClickEvent')
    that.setState({'popupOpen':true})
    that.setState({'currentCard':cardId})
    that.setState({'currentLane':laneId})

    for(var i = 0; i < that.props.lanes.length; ++i)
    {
        if(that.props.lanes[i].id == laneId)
        {
            that.setState({'currentLaneIndex':i})
            break;
        }
    }
    for(var i = 0; i < that.props.lanes[that.state.currentLaneIndex].cards.length; ++i)
    {
        if(that.props.lanes[that.state.currentLaneIndex].cards[i].id == cardId)
        {
            that.setState({'currentCardIndex':i})
            break;
        }
    }
}

const onCardAddEvent = (card, laneId, that) => { // title, description
    console.log('EVENT: onCardAddEvent')
    axios.post('https://trollo195.herokuapp.com/tasks/add/' + laneId, {
        description: card.description
    })
        .then(function(response){
            that.props.addCard(response.data.description, response.data.taskListId, response.data.taskId)
            NotificationManager.success(response.data.description, 'Add Card Successful!');            
        })
        .catch(function(error){
            NotificationManager.error('', 'Add Card Faild!')

            console.log(error)
        })
}

const onCardDeleteEvent = (cardId, laneId) => {
    console.log('EVENT: onCardDeleteEvent')
}

const onCardMoveAcrossLanesEvent = (fromLaneId, toLaneId, cardId, index) => {
    console.log('EVENT: onCardMoveAcrossLanesEvent')
}

const onLaneAddEvent = (params, boardId, that) => { //title: "..."
    console.log('EVENT: onLaneAddEvent')
    axios.post('https://trollo195.herokuapp.com/taskLists/' + boardId, {
        name: params.title
    })
        .then(function(response){
            that.props.addLane(params.title, response.data.taskListId)
            NotificationManager.success(params.title, 'Add Lane Successful!');
        })
        .catch(function(error){
            NotificationManager.error('', 'Add Lane Faild!')
            console.log(error)
        })
}

const onLaneDeleteEvent = (laneId) => {
    console.log('EVENT: onLaneDeleteEvent')
}

const onLaneUpdateEvent = (laneId, data, that) => { //title: "..."
    console.log('EVENT: onLaneUpdateEvent')
    // console.log(laneId)
    console.log("title " + data.title)
    axios.patch('https://trollo195.herokuapp.com/taskLists/' + laneId + '/rename', {
        name: data.title
    })
        .then(function(response){
            that.props.changeLaneName(data.title, laneId)
            NotificationManager.success(data.title, 'Change Lane Name Succeed!');

        })
        .catch(function(error){
            NotificationManager.error('', 'Change Lane Name Faild!')

            console.log(error)
        })
}

const onLaneClickEvent = (laneId) => {
    console.log('EVENT: onLaneClickEvent')
}

const onLaneScrollEvent = (requestedPage, laneId) => {
    console.log('EVENT: onLaneScrollEvent')
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//zawartośc karty
const getComment = (cardId, laneId, commentId, that) => {
    axios.get('https://trollo195.herokuapp.com/comments/get/' + commentId.toString(),{data:{}})
        .then(function(response){
            that.props.addComment(response.data.content, response.data.commentId, cardId, laneId)
            NotificationManager.success('', 'Get Comment Succeed!');
        })
        .catch(function(error){
            NotificationManager.error('', 'Get Comment Faild!')
            console.log(error)
        })
}

const setComment = (commentId, content, that) => {
    axios.post('https://trollo195.herokuapp.com/comments/edit', {
        commentId: commentId.toString(),
        content: content
    })
        .then(function(response){
            that.props.changeComment(response.data.name, response.data.content, response.data.commentId)
            NotificationManager.success('', 'Edit Comment Succeed!');
        })
        .catch(function(error){
            NotificationManager.error('', 'Edit Comment Faild!')
            console.log(error)
        })
}

const createComment = (taskId, content, that) => {
    if(taskId < 0)
    {
        console.error("taskId is incorrect");
    }
    else
    {
        axios.post('https://trollo195.herokuapp.com/comments/add', {
            taskId: taskId,
            content: content
        })
            .then(function(response){
                //tu będzie odświerzenie karty
                //that.props.createComment(response.data.content, response.data.attachementId, cardId, laneId)
                NotificationManager.success(taskId, 'Add Comment Succeed!');
            })
            .catch(function(error){
                NotificationManager.error('', 'Add Comment Faild!')
                console.log(error)
            })
    }
}

const getAttachment = (cardId, laneId, attachmentId, that) => {
    axios.get('https://trollo195.herokuapp.com/attachments/get/' + attachmentId,{data:{}})
        .then(function(response){
            that.props.addAttachment(response.data.name, response.data.content, response.data.attachmentId, cardId, laneId)
            NotificationManager.success(attachmentId, 'Get Attachment Succeed!');
        })
        .catch(function(error){
            NotificationManager.error('', 'Get Attachment Faild!')
            console.log(error)
        })
}

const createAttachement = (taskId, name, content, that) => {
    if(taskId < 0)
    {
        console.error("taskId is incorrect");
    }
    else
    {
        console.log(taskId + " " + name + " " + content)
        axios.post('https://trollo195.herokuapp.com/attachments/task/' + taskId, {
            name: name,
            content: content.toString()
        })
            .then(function(response){
                //tu będzie odświerzenie karty
                //that.props.createAttachement(response.data.name, response.data.content, response.data.attachementId, cardId, laneId)
                NotificationManager.success(taskId, 'Create Attachement Succeed!');
            })
            .catch(function(error){
                NotificationManager.error('', 'Create Attachement Faild!')
                console.log(error)
            })
    }
}

const createAttachementComment = (taskId, name, content, that) => {
    if(taskId < 0)
    {
        console.error("taskId is incorrect");
    }
    else
    {
        console.log(taskId + " " + name + " " + content)
        axios.post('https://trollo195.herokuapp.com/attachments/comment/' + taskId, {
            name: name,
            content: content
        })
            .then(function(response){
                //tu będzie odświerzenie karty
                //that.props.createAttachement(response.data.name, response.data.content, response.data.attachementId, cardId, laneId)
                NotificationManager.success(taskId, 'Create Attachement Succeed!');
            })
            .catch(function(error){
                NotificationManager.error('', 'Create Attachement Faild!')
                console.log(error)
            })
    }
}

const downloadAttachemnt = (name, content, that) => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + content);
    element.setAttribute('download', name);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

const removeAttachment = (attachmentId, that) => {
    if(attachmentId < 0)
    {
        console.error("attachmentId is incorrect");
    }
    else
    {
        console.log(attachmentId)
        axios.post('https://trollo195.herokuapp.com/attachments/delete/' + attachmentId, {data:{}})
            .then(function(response){
                //tu będzie odświerzenie karty
                //that.props.createAttachement(response.data.name, response.data.content, response.data.attachementId, cardId, laneId)
                NotificationManager.success(attachmentId, 'Delete Attachement Succeed!');
            })
            .catch(function(error){
                NotificationManager.error('', 'Delete Attachement Faild!')
                console.log(error)
            })
    }
}

/////////////////////////////////////////////////////////////////////////////////////

const onClosePopupEvent = (that) =>{
    that.setState({'popupOpen':false})
}

//////////////////////////////////////////////////////////////////////////////////////


export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(TrelloBoard))