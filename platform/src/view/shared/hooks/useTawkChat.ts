import { useEffect, useRef } from "react";
import settingsService from "src/modules/settings/settingsService";

declare global {
  interface Window {
    Tawk_API?: any;
  }
}

function stripComments(raw: string): string {
  return raw.replace(/<!--[\s\S]*?-->/g, "");
}

// Splits a pasted Tawk.to snippet into its non-script markup (an "Embed"
// type widget ships its own `<div id="tawk_...">` placeholder alongside the
// script - a plain "Inline" (floating-bubble) widget ships no markup at
// all, just the script) and the JS inside any <script> tags, in one pass so
// there's no shared-regex lastIndex bug from reusing a global regex across
// two separate .exec()/.replace() calls.
function splitSnippet(raw: string): { html: string; scripts: string[] } {
  const scripts: string[] = [];
  const html = raw
    .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, (_match, body) => {
      scripts.push(body);
      return "";
    })
    .trim();
  return { html, scripts };
}

function runScripts(scripts: string[]) {
  for (const body of scripts) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.text = body;
    document.body.appendChild(script);
  }
}

// Mounts the Tawk.to widget the admin configured in Settings into the
// container this hook's caller attaches the returned ref to.
//
// Tawk.to widgets come in two dashboard-configured types (Administration >
// Chat Widget > Add Widget > "Inline" or "Embed" - see
// https://help.tawk.to/article/what-is-the-difference-between-an-inline-widget-and-an-embed-widget):
// an "Inline" widget floats over the whole site and its snippet is just a
// bare <script>; an "Embed" widget sits inside page content and its
// snippet ships its OWN placeholder <div> alongside the script. Which one
// renders is decided when the widget is created in the Tawk.to dashboard,
// not by anything this code can override - a floating Inline widget can't
// be redirected into an arbitrary page container from the client side (an
// earlier version tried exactly that via `Tawk_API.embedded` and it never
// worked). So this renders whatever markup the pasted snippet actually
// ships: if it includes its own div (a real Embed widget), that markup is
// inserted into the container verbatim and the widget appears right there;
// if it's a bare Inline-widget script with no markup of its own, this
// leaves the page's own placeholder content alone and instead pops the
// widget open as a floating window via the documented onLoad/maximize()
// API, so visitors still see something rather than nothing.
export default function useTawkChat() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const settings = await settingsService.find();
        const raw = (settings?.tawkToCode || "").toString().trim();

        if (!raw) {
          console.warn(
            "useTawkChat: Settings > Tawk.to Live Chat Code is empty - nothing to load."
          );
          return;
        }

        if (cancelled || !containerRef.current) {
          return;
        }

        const { html, scripts } = splitSnippet(stripComments(raw));

        if (html) {
          // Real Embed-type widget - its own div goes exactly where the
          // page wants the chat to appear.
          containerRef.current.innerHTML = html;
        } else {
          // Bare Inline-type widget script - can't be embedded, so open it
          // as a floating window instead of leaving it invisible.
          console.warn(
            'useTawkChat: the pasted Tawk.to code has no placeholder <div> of its own, so it can only float - ' +
              'create an "Embed" type widget in the Tawk.to dashboard (Administration > Chat Widget > Add Widget > Embed) ' +
              "for it to render inline here."
          );
          window.Tawk_API = window.Tawk_API || {};
          window.Tawk_API.onLoad = function () {
            try {
              window.Tawk_API.maximize();
            } catch (error) {
              console.error("useTawkChat: Tawk_API.maximize() threw", error);
            }
          };
        }

        runScripts(scripts);
      } catch (error) {
        console.error("useTawkChat: failed to load the Tawk.to widget", error);
      }
    })();

    return () => {
      cancelled = true;
      try {
        window.Tawk_API && window.Tawk_API.hideWidget && window.Tawk_API.hideWidget();
      } catch (error) {
        // ignore - widget may not have finished loading yet
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      delete window.Tawk_API;
    };
  }, []);

  return containerRef;
}
