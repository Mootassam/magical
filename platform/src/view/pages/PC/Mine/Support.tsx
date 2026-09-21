import React from "react";
import useTawkChat from "src/view/shared/hooks/useTawkChat";
import MineShell from "./MineShell";
import { sharedMineStyles } from "./MyAccount";
import { i18n } from "../../../../i18n";

const TAWK_CONTAINER_ID = "pc-tawk-chat-embed";

function Support() {
  useTawkChat(TAWK_CONTAINER_ID);

  return (
    <MineShell active="support">
      <h1 className="pc-mine__page-title">{i18n("estore.pc.mine.support.title")}</h1>

      <div className="pc-card pc-mine__support-panel">
        <div id={TAWK_CONTAINER_ID} className="pc-mine__tawk-embed">
          <div className="pc-mine__support-empty">
            <div className="pc-mine__empty-icon">🎧</div>
            <div className="pc-mine__empty-title">{i18n("estore.pc.mine.support.emptyTitle")}</div>
            <div className="pc-mine__empty-text">{i18n("estore.pc.mine.support.emptyText")}</div>
          </div>
        </div>
      </div>

      <style>{sharedMineStyles}</style>
      <style>{`
        .pc-mine__support-panel {
          padding: 0;
          min-height: 480px;
          overflow: hidden;
        }

        .pc-mine__tawk-embed {
          width: 100%;
          min-height: 480px;
        }

        .pc-mine__support-empty {
          padding: 80px 24px;
          text-align: center;
        }
      `}</style>
    </MineShell>
  );
}

export default Support;
