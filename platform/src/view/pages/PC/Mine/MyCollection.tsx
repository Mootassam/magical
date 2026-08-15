import React from "react";
import { useHistory } from "react-router-dom";
import MineShell from "./MineShell";
import { sharedMineStyles } from "./MyAccount";
import { i18n } from "../../../../i18n";

function MyCollection() {
  const history = useHistory();

  return (
    <MineShell active="collection">
      <h1 className="pc-mine__page-title">{i18n("estore.pc.mine.myCollection.title")}</h1>

      <div className="pc-card pc-mine__empty">
        <div className="pc-mine__empty-icon">❤️</div>
        <div className="pc-mine__empty-title">{i18n("estore.pc.mine.myCollection.emptyTitle")}</div>
        <div className="pc-mine__empty-text">
          {i18n("estore.pc.mine.myCollection.emptyText")}
        </div>
        <button type="button" className="pc-btn pc-btn-primary" onClick={() => history.push("/pc/classification")}>
          {i18n("estore.pc.mine.myCollection.browseProducts")}
        </button>
      </div>

      <style>{sharedMineStyles}</style>
    </MineShell>
  );
}

export default MyCollection;
