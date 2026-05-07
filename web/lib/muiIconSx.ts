/**
 * Sizing for MUI `SvgIcon` (Outlined). Return type is `any` on purpose: this repo’s
 * `@mui/material` + TypeScript can reject plain objects for `sx` (e.g. `color` / `flex` unions).
 */
export function oIcon(
  sizePx: number,
  options?: ({ color?: string; display?: "block" | "inline-block" | "flex" } & Record<
    string,
    unknown
  >),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- SvgIcon `sx` typing vs object literal: see module docstring
): any {
  const { color, display, ...rest } = options ?? {};
  return {
    fontSize: sizePx,
    width: sizePx,
    height: sizePx,
    display: display ?? "block",
    flexShrink: 0,
    ...(color ? { color } : {}),
    ...rest,
  };
}
