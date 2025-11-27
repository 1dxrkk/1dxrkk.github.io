import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/gui/";
import { Button } from "../../components/ui/";
import { fetchRandomPost } from "../../lib/supabase";

import "./Home.css";

export default function Home() {
  const [randomPost, setRandomPost] = useState<any>(null);
  const [subtitle, setSubtitle] = useState("");

  const subtitles = [
    "barbecue chicken alert",
    "fuhh wit yo boy",
    "stay hydrated",
    "frick ms webb",
    "quack quack",
    "the game",
    "you are now blinking manually",
    "you are now breathing manually",
    "yo i finally got a girl",
    "are you winning son?",
    "feel like a mexican way my money climbing up high 💸",
    "its the first of the month",
    "is ts tuff?",
  ];

  // Pick a random subtitle
  function pickSubtitle() {
    const next = subtitles[Math.floor(Math.random() * subtitles.length)];
    setSubtitle(next);
  }

  // Load random post FROM SUPABASE
  async function loadRandom() {
    const post = await fetchRandomPost();
    setRandomPost(post);
    pickSubtitle(); // <—— subtitle updates *with* the new post
  }

 // Initial load
  useEffect(() => {
    loadRandom();
  }, []);

  return (
    <>
      <Header />
      <div className="announcement-badge">
        this is just the begining... v0.1.1 out now!
      </div>

      <h1 className="hero">1dxrk's vault</h1>
      <p className="subtitle">{subtitle}</p>

      <div className="glass-list">
        <div className="glass-item">
          <div className="glass-glow"></div>
          Item One
        </div>

        {/* RANDOM POST BOX */}
        <div className="glass-item" onClick={loadRandom}>
          <div className="glass-glow"></div>

          {randomPost ? (
            <div className="random-post">
              <h5>New Posts</h5>

              <h3 className="rp-title">{randomPost.title}</h3>

              <p className="rp-body">
                {randomPost.body?.slice(0, 120) ?? ""}
                {randomPost.body && randomPost.body.length > 120 ? "..." : ""}
              </p>

              <Link to="/forums" className="rp-link">
                open thread →
              </Link>
            </div>
          ) : (
            <p>Loading post...</p>
          )}
        </div>
      </div>

      <div className="patch-card">
        <div className="patch-header">
          <div className="info">
            <span className="patch-version">v0.1.1</span>
            <span className="patch-title">Update Notes</span>
          </div>
          <div className="actions">
            <Button variant="icon">👍</Button>
            <Button variant="icon">👎</Button>
          </div>
        </div>

        <ul className="patch-list">
          <li>Added home page</li>
          <li>
            Added <Link to="/forums">Forums</Link>
          </li>
        </ul>
      </div>

      <Link to="/patch-notes">view all patch notes</Link>
    </>
  );
}
