import { connect } from "react-redux";
import { formatTweet, formatDate} from "../utils/helpers";
import { TiArrowBackOutline,
    TiHeartOutline,
    TiHeartFullOutline,
} from "react-icons/ti";
import { handleToggleTweet, handleDeleteTweet} from "../actions/tweets";
import {Link, useNavigate } from "react-router";
import { MdDeleteOutline } from "react-icons/md";
 
const Tweet = (props) => {
    const navigate = useNavigate();

    const handleDelete = (e) => {
        e.preventDefault();

        const {dispatch, tweet} = props;
        dispatch(
            handleDeleteTweet({
                id: tweet.id,
            })
        )
    }

    const handleLike = (e) => {
        e.preventDefault();

        const { dispatch, tweet, authedUser } = props;
        dispatch(
          handleToggleTweet({
            id: tweet.id,
            hasLiked: tweet.hasLiked,
            authedUser,
          })
        );
    }

    const toParent =(e, id) => {
        e.preventDefault();
        navigate(`/tweet/${id}`)
    } 

    if (props.tweet === null){
        return <p>This Tweet doesn't exist</p>
    }

    const {name, timestamp, avatar, text, hasLiked, likes, id, replies, parent} = props.tweet;
    
    return(
        <Link to={`/tweet/${id}`} className="tweet">
            <img src={avatar} alt={`Avatar of ${name}`} className="avatar"/>
            <div className="tweet-info">
                <div>
                <span>{name}</span>
                <div>{formatDate(timestamp)}</div>
                {
                    parent && (
                        <button className="replying-to" onClick={(e) => toParent(e, parent.id)}>
                            Replying to @{parent.author}
                        </button>
                    )
                }
                <p>{text}</p>
                </div>
                <div className="tweet-icons">
                    <TiArrowBackOutline className="tweet-icon"/>
                    <span>{replies !== 0 && replies}</span>
                    <button className="heart-button" onClick={handleLike}>
                        {hasLiked === true ? (
                        <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
                        ) : (
                        <TiHeartOutline className="tweet-icon" />
                        )}
                    </button>
                    <span>{likes !== 0 && likes}</span>
                    <button className="delete-icon" onClick={handleDelete}>
                        <MdDeleteOutline className="tweet-icon"/>
                    </button>
                </div>
            </div>
        </Link>
    )
};

const mapStateToProps = ({authedUser, users, tweets}, {id}) => {
    const tweet = tweets[id];
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null;
    return {
        authedUser,
        tweet: tweet ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) : null
    }
}

export default connect(mapStateToProps)(Tweet);