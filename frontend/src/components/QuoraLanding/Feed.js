import React, { useEffect, useState } from "react";
import QuorBox from "./QuorBox";
import "./Feed.css";
import { Post } from './Post'; // Import the AdditionalContent component
// import db from "../../firebase";
import axios from "axios";
// import { token } from "../../Utils/decodedToken";
import Uploads from "./upload";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios.get("/api/questions", config).then((res) => {
      setPosts(res.data.reverse());
      console.log(res.data);
    });
  }, []);

  return (
    <div className="feed">
      <QuorBox />
      {posts.map((_post) => (
        <Post
          key={_post._id}
          questionId={_post._id}
          question={_post.questionName}
          imageUrl={_post.questionUrl}
          timestamp={_post.createdAt}
          users={_post.userDetails[0]}
          answers={_post.allAnswers}
        />
      ))}
      {/* Render the AdditionalContent component here */}
      <Uploads />
    </div>
  );
}

export default Feed;
