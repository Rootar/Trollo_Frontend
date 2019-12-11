import React, {Component} from 'react';
import Board from 'react-trello'
import { connect } from "react-redux";
import { addLane, clear, changeLaneName} from "../actions";
import axios from 'axios';

class TrelloBoard extends Component {
    componentDidMount(){
        this.props.clear()
        loadLanessList(this.props.boardId, this);
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
                onCardAdd={onCardAddEvent}
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
    changeLaneName: (title, laneId) => dispatch(changeLaneName(title, laneId))
    // deleteLane: id => dispatch(deleteLane(id))
})



/////////////////////////////////////////////////////////////////////// 



const loadLanessList = (boardId, that) => {
    axios.get('https://trollo195.herokuapp.com/boards/getBoard/' + boardId,{data:{}})
        .then(function(response){
            console.log(response)
            response.data.taskLists.map((taskList) => (
                that.props.addLane(taskList.name, taskList.taskListId)))
        })
        .catch(function(error){
            console.log("CREATE BOARD ERROR: " + error)
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

const onCardAddEvent = (card, laneId) => { // title, description
    console.log('EVENT: onCardAddEvent')

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
        })
        .catch(function(error){
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
        })
        .catch(function(error){
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