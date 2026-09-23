import React from "react";
import useTawkChat from "src/view/shared/hooks/useTawkChat";
import MineShell from "./MineShell";
import { sharedMineStyles } from "./MyAccount";
import { i18n } from "../../../../i18n";

function Support() {
  const tawkRef = useTawkChat();

  return (
    <MineShell active="support">
      <h1 className="pc-mine__page-title">{i18n("estore.pc.mine.support.title")}</h1>

      <div className="pc-card pc-mine__support-panel">
        {/* Left empty for useTawkChat to fill in with real Tawk.to embed
            markup - never given JSX children, so the hook's direct DOM
            writes never conflict with React's own reconciliation. */}
        <div ref={tawkRef} className="pc-mine__tawk-embed" />

        <div className="pc-mine__support-empty">
          <div className="pc-mine__empty-icon">🎧</div>
          <div className="pc-mine__empty-title">{i18n("estore.pc.mine.support.emptyTitle")}</div>
          <div className="pc-mine__empty-text">{i18n("estore.pc.mine.support.emptyText")}</div>
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

        .pc-mine__tawk-embed:empty {
          display: none;
        }

        /* Once the hook fills the embed div with real Tawk.to markup, hide
           the placeholder message instead of stacking both. */
        .pc-mine__tawk-embed:not(:empty) ~ .pc-mine__support-empty {
          display: none;
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
