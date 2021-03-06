import { CONSTANTS } from "../actions";
const initialState = {};



const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST: {
      const { title, id } = action.payload;
      
      const newList = {
        title: title,
        id: `list-${id}`,
        cards: []
      };
    
      
      const newState = { ...state, [`list-${id}`]: newList };

      return newState;
    }
   
    //here we add the card to the target list
    case CONSTANTS.ADD_CARD: {
      const { listID, id } = action.payload;
      //we pass the listID were the card wants to be created
      const list = state[listID];
      //add the new card to the end of the array once it is created
      list.cards.push(`card-${id}`);
      return { ...state, [listID]: list };
    }

    
    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        type
      } = action.payload;

      // draggin lists around - the listOrderReducer should handle this
      if (type === "list") {
        return state;
      }

      // in the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state[droppableIdStart];
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
        return { ...state, [droppableIdStart]: list };
      }

      // other list
      if (droppableIdStart !== droppableIdEnd) {
        // find the list where the drag happened
        const listStart = state[droppableIdStart];
        // pull out the card from this list
        const card = listStart.cards.splice(droppableIndexStart, 1);
        // find the list where the drag ended
        //const cards = this.props;
        const listEnd = state[droppableIdEnd];
        // put the card in the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
        return {
          ...state,
          [droppableIdStart]: listStart,
          [droppableIdEnd]: listEnd
        };
      }
      return state;

    case CONSTANTS.DELETE_CARD: {
      const { listID, id } = action.payload;
      //id->is the id of the card that wants to be deleted and listID is used to know in what list it is the card
      const list = state[listID];

      //the filter method creates a new array with all the elements that pass the test implemented
      const newCards = list.cards.filter(cardID => cardID !== id);

      //in the end we use the spread operator to copy properties from one object to another
      return { ...state, [listID]: { ...list, cards: newCards } };
    }

    case CONSTANTS.EDIT_LIST_TITLE: {
      const { listID, newTitle } = action.payload;

      const list = state[listID];
      list.title = newTitle;
      return { ...state, [listID]: list };
    }

    // case CONSTANTS.DELETE_LIST: {
    //   const { listID } = action.payload;
    //   const newState = state;
    //   delete newState[listID];
    //   return newState;
    // }
    case CONSTANTS.IMPORT_CARD: {
      const { listID, id } = action.payload;
      const list = state[listID];
      list.cards.push(id);
      return { ...state, [listID]: list };
    }

    case CONSTANTS.IMPORT_LIST: {
      const { title, id } = action.payload;
      const newID = id;
      const newList = {
        title,
        id: newID,
        cards: [],
      };

      const newState = { ...state, [newID]: newList };
      return newState;
  }
  default:
    return state;
      
}
};

export default listsReducer;