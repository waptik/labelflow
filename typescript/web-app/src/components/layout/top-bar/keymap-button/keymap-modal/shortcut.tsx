import { Fragment } from "react";
import { Kbd, Tooltip } from "@chakra-ui/react";

/**
 * Given a hotkeys.js keycode, create a nice string to display it
 * See https://github.com/jaywcjlove/hotkeys#supported-keys
 * @param key a hotkeys key code
 * @returns a displayable version of this code
 */
export const displayKey = (key: string) =>
  key
    .replace(/left/g, "←")
    .replace(/right/g, "→")
    .replace(/up/g, "↑")
    .replace(/down/g, "↓")
    .replace(/command/g, "⌘")
    // We do not want to show "⌃" for ctrl so we comment this...
    //   .replace(/control/g, "⌃")
    //   .replace(/ctrl/g, "⌃")
    // ... and use this instead:
    .replace(/control/g, "ctrl")
    .replace(/ctrl/g, "ctrl")
    .replace(/option/g, "⌥")
    .replace(/alt/g, "⌥")
    .replace(/shift/g, "⇧")
    .replace(/caps/g, "⇪")
    .replace(/enter/g, "↩︎")
    .replace(/return/g, "↩︎")
    .replace(/backspace/g, "⌫")
    .replace(/clear/g, "⌦")
    .replace(/tab/g, "⇥")
    .replace(/home/g, "↖︎")
    .replace(/end/g, "↘︎")
    .replace(/pageup/g, "⇞")
    .replace(/pagedown/g, "⇟")
    // .replace(/del/g, "⌧")
    .replace(/delete/g, "⌧");

export const Shortcut = ({ keys }: { keys: string }) => {
  const keyCombos = keys
    .replace(/\s/g, "") // Remove spaces
    .split(",") // Split into several key combos
    .map((keyCombo) => keyCombo.split("+")); // Split each combo into individual keys

  return (
    <>
      {keyCombos.map((keyCombo, keyComboIndex) => (
        <Fragment key={keyCombo.join("+")}>
          {keyComboIndex === 0 ? null : "  or  "}
          <Tooltip
            label={keyCombo.join(" + ")}
            aria-label={keyCombo.join(" + ")}
          >
            <span>
              {keyCombo.map((key, keyIndex) => (
                <Fragment key={key}>
                  {keyIndex === 0 ? null : " "}
                  <Kbd>{displayKey(key)}</Kbd>
                </Fragment>
              ))}
            </span>
          </Tooltip>
        </Fragment>
      ))}
    </>
  );
};
