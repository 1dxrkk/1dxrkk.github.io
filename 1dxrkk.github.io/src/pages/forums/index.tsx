import { useState } from "react";
import { Header } from "../../components/gui";
import "./Forums.css";
import { Button } from "../../components/ui";

interface Reply {
  text: string;
}

interface Post {
  title: string;
  body: string;
  liked: boolean;
  disliked: boolean;
  favorite: boolean;
  replies: Reply[];
}

export default function Forums() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [replyText, setReplyText] = useState<string[]>([]);

  function createPost(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    const newPost: Post = {
      title,
      body,
      liked: false,
      disliked: false,
      favorite: false,
      replies: [],
    };

    setPosts([newPost, ...posts]);
    setReplyText(["", ...replyText]);
    setTitle("");
    setBody("");
  }

  function toggleLike(index: number) {
    const updated = [...posts];
    const post = updated[index];

    post.liked = !post.liked;
    if (post.liked) post.disliked = false;

    setPosts(updated);
  }

  function toggleDislike(index: number) {
    const updated = [...posts];
    const post = updated[index];

    post.disliked = !post.disliked;
    if (post.disliked) post.liked = false;

    setPosts(updated);
  }

  function toggleFavorite(index: number) {
    const updated = [...posts];
    updated[index].favorite = !updated[index].favorite;
    setPosts(updated);
  }

  function addReply(index: number) {
    const text = replyText[index]?.trim();
    if (!text) return;

    const updated = [...posts];
    updated[index].replies.push({ text });

    setPosts(updated);

    const updatedReplies = [...replyText];
    updatedReplies[index] = "";
    setReplyText(updatedReplies);
  }

  return (
    <>
      <Header />

      <div className="forum-page">
        <h1 className="forum-title">Forums</h1>

        {/* Create Post */}
        <form className="forum-create" onSubmit={createPost}>
          <input
            type="text"
            placeholder="Thread title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="underline"
          />

          <textarea
            placeholder="Write your thread content..."
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <Button variant="accent" type="submit">
            Create Thread
          </Button>
        </form>

        <div className="divider"></div>

        {/* POSTS */}
        <div className="forum-list">
          {posts.length === 0 && (
            <p className="empty">No threads yet. Be the first to post.</p>
          )}

          {posts.map((post, index) => (
            <div className="thread-card" key={index}>
              <div className="thread-header">
                <h2 className="thread-title">{post.title}</h2>
              </div>

              <p className="thread-body">{post.body}</p>

              {/* Actions */}
              <div className="thread-actions">
                <button
                  className={`action-btn ${post.liked ? "active" : ""}`}
                  onClick={() => toggleLike(index)}
                >
                  👍 {post.liked ? "Liked" : "Like"}
                </button>

                <button
                  className={`action-btn ${post.disliked ? "active" : ""}`}
                  onClick={() => toggleDislike(index)}
                >
                  👎 {post.disliked ? "Disliked" : "Dislike"}
                </button>

                <button
                  className={`action-btn ${post.favorite ? "active" : ""}`}
                  onClick={() => toggleFavorite(index)}
                >
                  ⭐ {post.favorite ? "Favorited" : "Favorite"}
                </button>
              </div>

              {/* Replies Section */}
              <div className="thread-replies">
                <h3 className="reply-title">Replies</h3>

                <div className="reply-input">
                  <textarea
                    placeholder="Write a reply..."
                    rows={2}
                    value={replyText[index] || ""}
                    onChange={(e) => {
                      const newValues = [...replyText];
                      newValues[index] = e.target.value;
                      setReplyText(newValues);
                    }}
                  />

                  <button className="action-btn" onClick={() => addReply(index)}>
                    Reply
                  </button>
                </div>

                {/* Reply Cards */}
                <div className="reply-list">
                  {post.replies.map((r, i) => (
                    <div className="reply-card" key={i}>
                      {r.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
