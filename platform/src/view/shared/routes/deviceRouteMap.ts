// Maps every phone route that has a matching desktop ("PC") route to its
// counterpart, so RoutesComponent can bounce a visitor to the right UI for
// their screen size - a wide window gets the /pc/* pages, a narrow one gets
// the phone pages - without duplicating this knowledge across components.
//
// Only pairs with a real page on both sides belong here. Anything left out
// (admin-only pages, wallet extras, etc.) simply renders as-is on any screen
// size instead of risking a redirect to a page that doesn't exist.
const ROUTE_PAIRS: Array<{ mobile: string; pc: string }> = [
  { mobile: "/", pc: "/pc" },
  { mobile: "/cart", pc: "/pc/cart" },
  { mobile: "/checkout", pc: "/pc/checkout" },
  { mobile: "/classification", pc: "/pc/classification" },
  { mobile: "/product/:id", pc: "/pc/product/:id" },
  { mobile: "/auth/signin", pc: "/pc/auth/signin" },
  { mobile: "/auth/signup", pc: "/pc/auth/signup" },
  { mobile: "/mine", pc: "/pc/mine" },
  { mobile: "/my-account", pc: "/pc/mine/account" },
  { mobile: "/my-order", pc: "/pc/mine/orders" },
  { mobile: "/delivery-address", pc: "/pc/mine/addresses" },
  { mobile: "/my-collection", pc: "/pc/mine/collection" },
  { mobile: "/my-browse", pc: "/pc/mine/browse" },
  { mobile: "/balance", pc: "/pc/mine/balance" },
  { mobile: "/topup", pc: "/pc/mine/deposit" },
  { mobile: "/deposit-record", pc: "/pc/mine/deposit-record" },
  { mobile: "/withdrawal", pc: "/pc/mine/withdrawal" },
  { mobile: "/withdrawal-record", pc: "/pc/mine/withdrawal-record" },
  { mobile: "/payment-password", pc: "/pc/mine/payment-password" },
  { mobile: "/apply-merchant", pc: "/pc/mine/apply-merchant" },
  { mobile: "/site-message", pc: "/pc/mine/messages" },
  { mobile: "/set-up", pc: "/pc/mine/settings" },
  { mobile: "/customer-service", pc: "/pc/mine/support" },
  { mobile: "/mine-seller", pc: "/pc/mine-seller" },
  { mobile: "/shop-details", pc: "/pc/mine-seller/shop-details" },
  { mobile: "/product-management", pc: "/pc/mine-seller/products" },
  { mobile: "/wholesale-management", pc: "/pc/mine-seller/wholesale" },
  { mobile: "/seller/set-up", pc: "/pc/mine-seller/settings" },
  // No dedicated mobile page for the seller fulfillment queue - send a
  // resized-down visitor back to the seller hub instead of leaving the
  // desktop-only page on screen.
  { mobile: "/mine-seller", pc: "/pc/mine-seller/orders" },
];

type CompiledPattern = { regex: RegExp; paramNames: string[] };
const compileCache = new Map<string, CompiledPattern>();

function compile(template: string): CompiledPattern {
  const cached = compileCache.get(template);
  if (cached) return cached;

  const paramNames: string[] = [];
  const pattern = template
    .split("/")
    .map((segment) => {
      if (segment.startsWith(":")) {
        paramNames.push(segment.slice(1));
        return "([^/]+)";
      }
      return segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    })
    .join("/");

  const compiled = { regex: new RegExp(`^${pattern}$`), paramNames };
  compileCache.set(template, compiled);
  return compiled;
}

function fill(template: string, params: Record<string, string>): string {
  return template
    .split("/")
    .map((segment) =>
      segment.startsWith(":") ? params[segment.slice(1)] : segment,
    )
    .join("/");
}

// Returns the counterpart path to redirect to, or null if this pathname
// isn't in the map (or is already on the right side for this screen size).
export function getDeviceRedirectPath(
  pathname: string,
  isDesktop: boolean,
): string | null {
  for (const pair of ROUTE_PAIRS) {
    const from = isDesktop ? pair.mobile : pair.pc;
    const to = isDesktop ? pair.pc : pair.mobile;
    const { regex, paramNames } = compile(from);
    const match = regex.exec(pathname);
    if (!match) continue;

    const params: Record<string, string> = {};
    paramNames.forEach((name, i) => {
      params[name] = match[i + 1];
    });
    return fill(to, params);
  }

  return null;
}
