import { useState, useEffect } from "react";
import { Header } from "../../components/gui";
import "./Forums.css";
import { Button } from "../../components/ui";

import {
  fetchPostsWithReplies,
  createNewPost,
  updatePostFields,
  createNewReply,
} from "../../lib/supabase";

import type { Post } from "../../types/forums";

export default function Forums() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [replyText, setReplyText] = useState<string[]>([]);

  // load posts
  useEffect(() => {
    loadPosts(); // initial load

    const interval = setInterval(() => {
      loadPosts(); // refresh every second
    }, 100);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  async function loadPosts() {
    const fullPosts = await fetchPostsWithReplies();

    // Only update state if changed
    if (JSON.stringify(fullPosts) !== JSON.stringify(posts)) {
      setPosts(fullPosts);
    }
  }

  // -------------------------------------------
  // CREATE POST
  // -------------------------------------------
  async function handleCreatePost(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    const { data } = await createNewPost(title, body);
    if (!data) return;

    setPosts([{ ...data, replies: [] }, ...posts]);
    setReplyText(["", ...replyText]);

    setTitle("");
    setBody("");
  }

  // -------------------------------------------
  // LIKE / DISLIKE / FAVORITE
  // -------------------------------------------
  async function toggleLike(index: number) {
    const p = posts[index];
    await updatePostFields(p.id, { liked: !p.liked, disliked: false });
    loadPosts();
  }

  async function toggleDislike(index: number) {
    const p = posts[index];
    await updatePostFields(p.id, { disliked: !p.disliked, liked: false });
    loadPosts();
  }

  async function toggleFavorite(index: number) {
    const p = posts[index];
    await updatePostFields(p.id, { favorite: !p.favorite });
    loadPosts();
  }

  // -------------------------------------------
  // ADD REPLY
  // -------------------------------------------
  async function addReply(index: number) {
    const content = replyText[index]?.trim();
    if (!content) return;

    const post = posts[index];
    await createNewReply(post.id, content);

    const r = [...replyText];
    r[index] = "";
    setReplyText(r);

    loadPosts();
  }

  // -------------------------------------------
  // RENDER
  // -------------------------------------------
  return (
    <>
      <Header />

      <div className="forum-page">
        <h1 className="forum-title">Forums</h1>

        {/* Create Thread */}
        <form className="forum-create" onSubmit={handleCreatePost}>
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

        {/* Thread List */}
        <div className="forum-list">
          {posts.length === 0 && (
            <p className="empty">No threads yet. Be the first to post.</p>
          )}

          {posts.map((post, index) => (
            <div className="thread-card" key={post.id}>
              <div className="thread-header">
                <h2 className="thread-title">{post.title}</h2>
              </div>

              <p className="thread-body">{post.body}</p>

              <div className="thread-actions">
                <Button
                  variant="icon"
                  subtypes="toggle"
                  toggled={post.liked}
                  onClick={() => toggleLike(index)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M144 224C161.7 224 176 238.3 176 256L176 512C176 529.7 161.7 544 144 544L96 544C78.3 544 64 529.7 64 512L64 256C64 238.3 78.3 224 96 224L144 224zM334.6 80C361.9 80 384 102.1 384 129.4L384 133.6C384 140.4 382.7 147.2 380.2 153.5L352 224L512 224C538.5 224 560 245.5 560 272C560 291.7 548.1 308.6 531.1 316C548.1 323.4 560 340.3 560 360C560 383.4 543.2 402.9 521 407.1C525.4 414.4 528 422.9 528 432C528 454.2 513 472.8 492.6 478.3C494.8 483.8 496 489.8 496 496C496 522.5 474.5 544 448 544L360.1 544C323.8 544 288.5 531.6 260.2 508.9L248 499.2C232.8 487.1 224 468.7 224 449.2L224 262.6C224 247.7 227.5 233 234.1 219.7L290.3 107.3C298.7 90.6 315.8 80 334.6 80z" />
                  </svg>
                </Button>
                <Button
                  variant="icon"
                  subtypes="toggle"
                  toggled={post.disliked}
                  onClick={() => toggleDislike(index)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M448 96C474.5 96 496 117.5 496 144C496 150.3 494.7 156.2 492.6 161.7C513 167.2 528 185.8 528 208C528 217.1 525.4 225.6 521 232.9C543.2 237.1 560 256.6 560 280C560 299.7 548.1 316.6 531.1 324C548.1 331.4 560 348.3 560 368C560 394.5 538.5 416 512 416L352 416L380.2 486.4C382.7 492.7 384 499.5 384 506.3L384 510.5C384 537.8 361.9 559.9 334.6 559.9C315.9 559.9 298.8 549.3 290.4 532.6L234.1 420.3C227.4 407 224 392.3 224 377.4L224 190.8C224 171.4 232.9 153 248 140.8L260.2 131.1C288.6 108.4 323.8 96 360.1 96L448 96zM144 160C161.7 160 176 174.3 176 192L176 448C176 465.7 161.7 480 144 480L96 480C78.3 480 64 465.7 64 448L64 192C64 174.3 78.3 160 96 160L144 160z" />
                  </svg>
                </Button>
                <Button
                  variant="icon"
                  subtypes="toggle"
                  toggled={post.favorite}
                  onClick={() => toggleFavorite(index)}
                >
                  <Button variant="icon" onClick={() => toggleFavorite(index)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <path d="M192 64C156.7 64 128 92.7 128 128L128 544C128 555.5 134.2 566.2 144.2 571.8C154.2 577.4 166.5 577.3 176.4 571.4L320 485.3L463.5 571.4C473.4 577.3 485.7 577.5 495.7 571.8C505.7 566.1 512 555.5 512 544L512 128C512 92.7 483.3 64 448 64L192 64z" />
                    </svg>
                  </Button>
                </Button>
              </div>

              {/* Replies */}
              <div className="thread-replies">
                <h3 className="reply-title">Replies</h3>

                {/* Reply input */}
                <div className="reply-input">
                  <textarea
                    placeholder="Write a reply..."
                    rows={2}
                    value={replyText[index] || ""}
                    onChange={(e) => {
                      const arr = [...replyText];
                      arr[index] = e.target.value;
                      setReplyText(arr);
                    }}
                  />

                  <button
                    className="action-btn"
                    onClick={() => addReply(index)}
                  >
                    Reply
                  </button>
                </div>

                {/* Reply list */}
                <div className="reply-list">
                  {post.replies.map((r) => (
                    <div className="reply-card" key={r.id}>
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
