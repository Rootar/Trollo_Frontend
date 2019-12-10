import React, {Component} from 'react';
import Board from 'react-trello'
import { connect } from "react-redux";
import { addLane, deleteLane } from "../actions";

class TrelloBoard extends Component {  
    componentDidMount(){
      this.props.addLane('test')
      this.props.addLane('test2')
      this.props.addLane('test3')
      this.props.addLane('test4')
      this.props.deleteLane('2')
    }  
  
    render(){
      let lanes = {
        lanes: this.props.lanes
      }
  
      return (
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
          onLaneAdd={onLaneAddEvent}
          onLaneDelete={onLaneDeleteEvent}
          onLaneUpdate={onLaneUpdateEvent}
          onLaneClick={onLaneClickEvent}
          onLaneScroll={onLaneScrollEvent}
        />
      );
    }  
}
  
const mapStateToProps = (state) => ({
  lanes: state.lanes
})

const mapDispatchToProps = (dispatch) => ({
  addLane: title => dispatch(addLane(title)),
  deleteLane: id => dispatch(deleteLane(id))
})

////////////////// EVENTS

const handleDragStartEvent = (cardId, laneId) => {
  console.log("EVENT: " + 'handleDragStartEvent')
}

const handleDragEndEvent = (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
  console.log("EVENT: " + 'handleDragEndEvent')
}

const handleLaneDragStartEvent = (laneId) => {
  console.log("EVENT: " + 'handleLaneDragStartEvent')
}

const handleLaneDragEndEvent = (removedIndex, addedIndex, payload) => {
  console.log("EVENT: " + 'handleLaneDragEndEvent')
}

const onDataChangeEvent = (newData) => {
  console.log("EVENT: " + 'onDataChangeEvent')
}

const onCardClickEvent = (cardId, metadata, laneId) => {
  console.log("EVENT: " + 'onCardClickEvent')
}

const onCardAddEvent = (card, laneId) => {
  console.log("EVENT: " + 'onCardAddEvent')
}

const onCardDeleteEvent = (cardId, laneId) => {
  console.log("EVENT: " + 'onCardDeleteEvent')
}

const onCardMoveAcrossLanesEvent = (fromLaneId, toLaneId, cardId, index) => {
  console.log("EVENT: " + 'onCardMoveAcrossLanesEvent')
}

const onLaneAddEvent = (params) => {
  console.log("EVENT: " + 'onLaneAddEvent')
}

const onLaneDeleteEvent = (laneId) => {
  console.log("EVENT: " + 'onLaneDeleteEvent')
}

const onLaneUpdateEvent = (laneId, data) => {
  console.log("EVENT: " + 'onLaneUpdateEvent')
}  

const onLaneClickEvent = (laneId) => {
  console.log("EVENT: " + 'onLaneClickEvent')
}

const onLaneScrollEvent = (requestedPage, laneId) => {
  console.log("EVENT: " + 'onLaneScrollEvent')
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)
(TrelloBoard)