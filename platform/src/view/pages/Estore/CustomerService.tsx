import React, { useEffect } from "react";
import settingsService from "src/modules/settings/settingsService";

// The div Tawk.to renders the chat into instead of its default floating
// corner bubble - see Tawk_API.embedded below.
const TAWK_CONTAINER_ID = "tawk-chat-embed";

// The admin pastes the full Tawk.to embed snippet (comments + <script> tags
// included) into Settings - this pulls out just the inline JS so it can be
// run as a real script (setting .text and appending it, rather than
// dangerouslySetInnerHTML, is what actually executes it).
function extractScriptBody(rawCode) {
  if (!rawCode) {
    return "";
  }

  const withoutComments = rawCode.replace(/<!--[\s\S]*?-->/g, "");
  const match = withoutComments.match(/<script[^>]*>([\s\S]*?)<\/script>/i);

  return match ? match[1] : withoutComments;
}

function CustomerService() {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const settings = await settingsService.find();
        const code = extractScriptBody(settings?.tawkToCode);

        if (!code || cancelled) {
          return;
        }

        const win = window as any;

        // Must be set before the widget script below finishes loading -
        // this is what tells Tawk.to to render inline into our container
        // instead of a floating bubble in the corner of the screen.
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
        // No widget configured yet (or the request failed) - the page just
        // falls back to the empty state below.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <div className="phone">

        <div className="page-header">
          <div className="left">
            <button className="back-btn" onClick={() => window.history.back()}>←</button>
            <span className="page-title">Customer Service</span>
          </div>
        </div>

        <div className="scroll-area">
          <div id={TAWK_CONTAINER_ID} className="tawk-embed">
            <div className="empty-state">
              Our support team will get back to you shortly.
            </div>
          </div>
        </div>

      </div>

      <style>{`
  :root{
    --navy:#0e1b45;
    --blue-bright:#2f8dff;
    --blue-deep:#0b3fae;
    --page-bg:#f4f7fd;
    --grey-text:#6b7590;
  }

  *{box-sizing:border-box; margin:0; padding:0;}

  body{
    font-family:'Segoe UI', Roboto, Arial, sans-serif;
    background:var(--page-bg);
    margin:0;
  }

  .phone{
    width:390px;
    max-width:390px;
    height:100vh;
    background:var(--page-bg);
    overflow:hidden;
    position:relative;
    display:flex;
    flex-direction:column;
    margin:0 auto;
  }

  /* ---------- Header ---------- */
  .page-header{
    background:linear-gradient(135deg, var(--blue-deep), var(--blue-bright));
    padding:14px 18px 16px;
    color:#fff;
    flex-shrink:0;
    display:flex;
    align-items:center;
    justify-content:space-between;
  }
  .page-header .left{ display:flex; align-items:center; gap:12px; }
  .back-btn{
    width:34px; height:34px;
    border-radius:50%;
    background:rgba(255,255,255,0.18);
    display:flex; align-items:center; justify-content:center;
    font-size:16px;
    cursor:pointer;
    border:none;
    color:#fff;
  }
  .page-title{ font-size:17px; font-weight:800; }

  /* ---------- Scroll body ---------- */
  .scroll-area{
    flex:1;
    overflow-y:auto;
    scrollbar-width:none;
    display:flex;
    flex-direction:column;
  }
  .scroll-area::-webkit-scrollbar{ display:none; }

  .tawk-embed{
    flex:1;
    display:flex;
    flex-direction:column;
    min-height:100%;
  }

  .empty-state{
    text-align:center;
    color:var(--grey-text);
    font-size:13px;
    padding:60px 20px;
  }
      `}</style>
    </>
  );
}

export default CustomerService;
