import React from "react";
import { useHistory } from "react-router-dom";
import MineShell from "./MineShell";
import { sharedMineStyles } from "./MyAccount";

function MyBrowse() {
  const history = useHistory();

  return (
    <MineShell active="browse">
      <h1 className="pc-mine__page-title">My Browse</h1>

      <div className="pc-card pc-mine__empty">
        <div className="pc-mine__empty-icon">🕓</div>
        <div className="pc-mine__empty-title">No browsing history yet</div>
        <div className="pc-mine__empty-text">
          Products you view will show up here so you can pick up where you left off.
        </div>
        <button type="button" className="pc-btn pc-btn-primary" onClick={() => history.push("/pc/classification")}>
          Start Shopping
        </button>
      </div>

      <style>{sharedMineStyles}</style>
    </MineShell>
  );
}

export default MyBrowse;
