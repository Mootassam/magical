import React from "react";
import { useHistory } from "react-router-dom";
import MineShell from "./MineShell";
import { sharedMineStyles } from "./MyAccount";

function MyCollection() {
  const history = useHistory();

  return (
    <MineShell active="collection">
      <h1 className="pc-mine__page-title">My Collection</h1>

      <div className="pc-card pc-mine__empty">
        <div className="pc-mine__empty-icon">❤️</div>
        <div className="pc-mine__empty-title">No saved items yet</div>
        <div className="pc-mine__empty-text">
          Products you save will appear here so you can find them again quickly.
        </div>
        <button type="button" className="pc-btn pc-btn-primary" onClick={() => history.push("/pc/classification")}>
          Browse Products
        </button>
      </div>

      <style>{sharedMineStyles}</style>
    </MineShell>
  );
}

export default MyCollection;
