import { connect } from "react-redux";
import React from "react";

const Dashboard = (props) => {
    return(
        <div>
            <h3 className="center">Your Timeline</h3>
            <ul className="dashboard-list"> 
                {
                    props.tweetsId.map((id) => (
                        <li key={id}>
                            Tweet ID: {id}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
};

const mapStateToProps = ({ tweets }) => ({
    tweetsId: Object.keys(tweets).sort(
      (a, b) => tweets[b].timestamp - tweets[a].timestamp
    ),
  });

export default connect(mapStateToProps)(Dashboard);