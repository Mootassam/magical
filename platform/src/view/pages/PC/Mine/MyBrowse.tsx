import React from "react";
import { useHistory } from "react-router-dom";
import MineShell from "./MineShell";
import { sharedMineStyles } from "./MyAccount";
import { i18n } from "../../../../i18n";

function MyBrowse() {
  const history = useHistory();

  return (
    <MineShell active="browse">
      <h1 className="pc-mine__page-title">{i18n("estore.pc.mine.myBrowse.title")}</h1>

      <div className="pc-card pc-mine__empty">
        <div className="pc-mine__empty-icon">🕓</div>
        <div className="pc-mine__empty-title">{i18n("estore.pc.mine.myBrowse.emptyTitle")}</div>
        <div className="pc-mine__empty-text">
          {i18n("estore.pc.mine.myBrowse.emptyText")}
        </div>
        <button type="button" className="pc-btn pc-btn-primary" onClick={() => history.push("/pc/classification")}>
          {i18n("estore.pc.mine.myBrowse.startShopping")}
        </button>
      </div>

      <style>{sharedMineStyles}</style>
    </MineShell>
  );
}

export default MyBrowse;
