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
          onLaneAdd={onLaneAddEvent}
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

  const onLaneAddEvent = (params) => {
    console.log(params)
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )
  (TrelloBoard)