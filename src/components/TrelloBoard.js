import React, {Component} from 'react';
import Board from 'react-trello'
import { connect } from "react-redux";
import { addLane, deleteLane } from "../actions";

class TrelloBoard extends Component {  
    componentDidMount(){
      this.props.addLane('test')
      this.props.deleteLane(2)
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
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )
  (TrelloBoard)