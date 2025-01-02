import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import NewTweet from "./NewTweet";
import TweetPage from "./TweetPage";


const App = (props) => {
  useEffect(() => {
      props.dispatch(handleInitialData());
  }, [])

  return( 
    <div>
      {props.loading === true ? null : <TweetPage match={{
        params: {id: "2mb6re13q842wu8n106bhk"}
      }}/>}
    </div>
  )
}


const mapStateToProps = ({authedUser}) => ({
  loading: authedUser === null,
})

export default connect(mapStateToProps)(App);