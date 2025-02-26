import { type } from "@testing-library/user-event/dist/type";
import { saveLikeToggle, saveTweet} from "../utils/api";

export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const DELETE_TWEETS = "DELETE_TWEETS"
export const TOGGLE_TWEET = "TOGGLE_TWEET";
export const ADD_TWEET = "ADD_TWEET";

function addTweet(tweet) {
  return{
    type: ADD_TWEET,
    tweet,
  }
}

export function handleAddTweet(text, replyingTo) {
  return (dispatch, getState) => {
    const {authedUser} = getState()
    return saveTweet({
      text, 
      author: authedUser,
      replyingTo,
    }).then((tweet) => dispatch(addTweet(tweet)));
  }
}

export function  receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets,
  };
}

function toggleTweet ({id, authedUser, hasLiked}) {
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked,
  };
}

function deleteTweet ({id}){
  return{
    type: DELETE_TWEETS,
    id,
  }
}

export function handleToggleTweet(info) {
  return (dispatch) => {
    dispatch(toggleTweet(info));

    return saveLikeToggle(info).catch((e) => {
      console.warn("Erro em handleToggleTweet: ", e);
      dispatch(toggleTweet(info));
      alert('Teve um erro ao curtir o tweet. Tente novamente!');
    })
  }
}

export function handleDeleteTweet(info) {
  return (dispatch) => {
    dispatch(deleteTweet(info))
  }
}