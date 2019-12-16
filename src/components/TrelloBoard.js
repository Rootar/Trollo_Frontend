import React, {Component} from 'react';
import Board from 'react-trello'
import { connect } from "react-redux";
import { addLane, clear, changeLaneName, addCard, changeCardName} from "../actions";
import axios from 'axios';
import {NotificationManager} from 'react-notifications';

class TrelloBoard extends Component {
    componentDidMount(){
        this.props.clear()
        loadLanessList(this.props.boardId, this);
    }

    state = {
        finish: false
    }
  
    render(){
        let lanes = {
            lanes: this.props.lanes
        }

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
                handleLaneDragEnd={handleLaneDragEndEvent}
                onDataChange={onDataChangeEvent}
                onCardClick={onCardClickEvent}
                onCardAdd={(card, laneId) => onCardAddEvent(card, laneId, this)}
                onCardDelete={onCardDeleteEvent}
                onCardMoveAcrossLanes={onCardMoveAcrossLanesEvent}
                onLaneAdd={(params) => onLaneAddEvent(params, this.props.boardId, this)}
                onLaneDelete={onLaneDeleteEvent}
                onLaneUpdate={(laneId, data) => onLaneUpdateEvent(laneId, data, this)}
                onLaneClick={onLaneClickEvent}
                onLaneScroll={onLaneScrollEvent}
            />
            </div>
        );
    }  
}
  
const mapStateToProps = (state) => ({
    lanes: state.lanes
})

const mapDispatchToProps = (dispatch) => ({
    clear: () => dispatch(clear()),
    addLane: (title, laneId) => dispatch(addLane(title, laneId)),
    changeLaneName: (title, laneId) => dispatch(changeLaneName(title, laneId)),
    addCard: (description, laneId, cardId) => dispatch(addCard(description, laneId, cardId)),
    changeCardName: (title, laneId) => dispatch(changeCardName(title, laneId))
    // deleteLane: id => dispatch(deleteLane(id))
})

/////////////////////////////////////////////////////////////////////// 



const loadLanessList = async(boardId, that) => {
    axios.get('https://trollo195.herokuapp.com/boards/getBoard/' + boardId,{data:{}})
        .then(function(response){
            console.log(response)
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

const handleLaneDragEndEvent = (removedIndex, addedIndex, payload) => {
    console.log('EVENT: handleLaneDragEndEvent')
}

const onDataChangeEvent = (newData) => {
    console.log('EVENT: onDataChangeEvent')
    // console.log(newData)
}

const onCardClickEvent = (cardId, metadata, laneId) => {
    console.log('EVENT: onCardClickEvent')
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



/////////////////////////////////////////////////////////////////////////////////////



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TrelloBoard)