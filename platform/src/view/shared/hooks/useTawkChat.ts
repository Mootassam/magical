import { useEffect } from "react";
import settingsService from "src/modules/settings/settingsService";

declare global {
  interface Window {
    Tawk_API?: any;
  }
}

const TAWK_SCRIPT_ID = "tawk-to-embed-script";

// The admin pastes the full Tawk.to embed snippet (comments + <script> tags
// included) into Settings - this pulls out just the inline JS so it can be
// run as a real script (setting .text and appending it, rather than
// dangerouslySetInnerHTML, is what actually executes it).
function extractScriptBody(rawCode?: string | null): string {
  if (!rawCode) {
    return "";
  }

  const withoutComments = rawCode.replace(/<!--[\s\S]*?-->/g, "");
  const match = withoutComments.match(/<script[^>]*>([\s\S]*?)<\/script>/i);

  return match ? match[1] : withoutComments;
}

function teardownTawk() {
  document.getElementById(TAWK_SCRIPT_ID)?.remove();
  delete window.Tawk_API;
}

// Mounts the Tawk.to widget inline into the `<div id={containerId}>` the
// caller renders, instead of the default floating bubble - this is what
// Tawk_API.embedded below does.
//
// The platform has two separate Live Chat pages that each render into their
// own container (the phone CustomerService page and the desktop
// PC/Mine/Support page), picked by RoutesComponent based on viewport width.
// That redirect can fire mid-session - the visitor resizes past the desktop
// breakpoint, or someone toggles a browser's device toolbar while already on
// the page - which unmounts one container and mounts the other without a
// full page reload. Tawk's widget is a page-global singleton: once its
// script has attached to a container it never moves itself to a different
// one, even if Tawk_API.embedded is reassigned afterwards. So this always
// tears down any previous Tawk instance before mounting a fresh one against
// the current container, the same cleanup useCrispChat.tsx already does for
// the (separate) Crisp widget - without it, the second page's mount would
// see Tawk already loaded, skip initialization, and leave its container
// permanently empty even though the widget "loaded" successfully once.
export default function useTawkChat(containerId: string) {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const settings = await settingsService.find();
        const code = extractScriptBody(settings?.tawkToCode);

        if (!code || cancelled) {
          return;
        }

        teardownTawk();

        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_API.embedded = containerId;

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.id = TAWK_SCRIPT_ID;
        script.text = code;
        document.body.appendChild(script);
      } catch (error) {
        // No widget configured yet (or the request failed) - the page just
        // falls back to the empty state it renders around this hook.
      }
    })();

    return () => {
      cancelled = true;
      teardownTawk();
    };
  }, [containerId]);
}
