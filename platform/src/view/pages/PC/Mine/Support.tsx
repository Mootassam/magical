import React, { useEffect } from "react";
import settingsService from "src/modules/settings/settingsService";
import MineShell from "./MineShell";
import { sharedMineStyles } from "./MyAccount";

const TAWK_CONTAINER_ID = "pc-tawk-chat-embed";

function extractScriptBody(rawCode) {
  if (!rawCode) return "";
  const withoutComments = rawCode.replace(/<!--[\s\S]*?-->/g, "");
  const match = withoutComments.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
  return match ? match[1] : withoutComments;
}

function Support() {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const settings = await settingsService.find();
        const code = extractScriptBody(settings?.tawkToCode);
        if (!code || cancelled) return;

        const win = window as any;
        win.Tawk_API = win.Tawk_API || {};
        win.Tawk_API.embedded = TAWK_CONTAINER_ID;

        if (!win.__tawkScriptInjected) {
          const script = document.createElement("script");
          script.type = "text/javascript";
          script.text = code;
          document.body.appendChild(script);
          win.__tawkScriptInjected = true;
        }
      } catch (error) {
        // No widget configured yet - falls back to the empty state below.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <MineShell active="support">
      <h1 className="pc-mine__page-title">Live Chat</h1>

      <div className="pc-card pc-mine__support-panel">
        <div id={TAWK_CONTAINER_ID} className="pc-mine__tawk-embed">
          <div className="pc-mine__support-empty">
            <div className="pc-mine__empty-icon">🎧</div>
            <div className="pc-mine__empty-title">Our support team will get back to you shortly</div>
            <div className="pc-mine__empty-text">Start a conversation and we'll respond as soon as we can.</div>
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
