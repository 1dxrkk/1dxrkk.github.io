import { Link } from "react-router-dom";
import { Header } from "../../components/gui/";
import { Button } from "../../components/ui/";
import "./Home.css";

export default function Home() {
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

  const randomSubtitle =
    subtitles[Math.floor(Math.random() * subtitles.length)];

  return (
    <>
      <Header />
      <div className="announcement-badge">
        this is just the begining... v0.1.1 out now!
      </div>
      <h1 className="hero">1dxrk's vault</h1>
      <p className="subtext">{randomSubtitle}</p>

      <div className="glass-list">
        <div className="glass-item">
          <div className="glass-glow"></div>
          Item One
        </div>

        <div className="glass-item">
          <div className="glass-glow"></div>
          Item Two
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
          <li>Added <Link to="/forums">Forums</Link></li>
        </ul>
      </div>
      <Link to="/patch-notes">view all patch notes</Link>
    </>
  );
}
