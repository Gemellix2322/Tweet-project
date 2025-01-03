import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import NewTweet from "./NewTweet";
import TweetPage from "./TweetPage";
import Nav from "./Nav";
import {Routes, Route} from "react-router-dom";


const App = (props) => {
  useEffect(() => {
      props.dispatch(handleInitialData());
  }, [])

  return( 
    <Fragment>
        <div className="container">
          <Nav/>
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/tweet/:id" element={<TweetPage />} />
            <Route path="/new" element={<NewTweet />} />
          </Routes>
        </div>
    </Fragment>
  )
}


const mapStateToProps = ({authedUser}) => ({
  loading: authedUser === null,
})

export default connect(mapStateToProps)(App);