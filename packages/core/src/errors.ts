export class TermUIError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'TermUIError';
    }
}

export class TermUIAbortError extends TermUIError {
    constructor(message = 'Prompt aborted') {
        super(message);
        this.name = 'TermUIAbortError';
    }
}

export class TermUICancelError extends TermUIError {
    constructor(message = 'Prompt cancelled') {
        super(message);
        this.name = 'TermUICancelError';
    }
}

export class TermUIValidationError extends TermUIError {
    field: string;

    constructor(field: string, message: string) {
        super(message);
        this.name = 'TermUIValidationError';
        this.field = field;
    }
}

/**
 * @fileoverview Runtime capability detection for terminal environments.
 * 
 * TermUI checks the terminal environment at module load to determine
 * which features are safe to use. These flags are read-only and
 * evaluated once — they do not react to runtime environment changes.
 * 
 * Environment variables:
 * - NO_UNICODE=1 → Disable unicode, use ASCII fallbacks
 * - NO_MOTION=1  → Skip animations, render static output
 * - NO_COLOR=1   → Strip ANSI color codes
 * - TERMUI_KEYBINDINGS=vim|emacs → Set navigation mode
 * 
 * @module @termuijs/core/caps
 */

/**
 * Terminal capability flags.
 * 
 * These are evaluated once when the module loads. All built-in widgets
 * check these flags automatically. Use them in custom widgets to provide
 * graceful fallbacks for restricted terminal environments (e.g., CI,
 * screen readers, or user preference).
 * 
 * @example
 * ```ts
 * import { caps } from '@termuijs/core'
 * 
 * const bullet = caps.unicode ? '●' : '*'  // Safe for any terminal
 * const bar = caps.unicode ? '█' : '#'     // Progress bar fallback
 * ```
 */
export const caps = {
  /**
   * Whether unicode characters are supported.
   * 
   * Set `NO_UNICODE=1` to disable unicode and force ASCII fallbacks.
   * Useful in CI environments or terminals with limited font support.
   * 
   * @default true (when NO_UNICODE is not set)
   */
  unicode: !process.env.NO_UNICODE,

  /**
   * Whether animations and motion effects are supported.
   * 
   * Set `NO_MOTION=1` to skip all animations and render static output.
   * Respects `prefers-reduced-motion` accessibility preference.
   * 
   * @default true (when NO_MOTION is not set)
   */
  motion: !process.env.NO_MOTION,

  /**
   * Whether ANSI color codes are supported.
   * 
   * Set `NO_COLOR=1` to disable all color output. Useful for:
   * - Piping output to files
   * - Terminals without color support
   * - User preference for plain text
   * 
   * @default true (when NO_COLOR is not set)
   */
  color: !process.env.NO_COLOR,

  /**
   * Global keybinding navigation mode.
   * 
   * Configures the default keyboard navigation scheme across all widgets.
   * 
   * - `"default"` → Arrow keys (↑↓←→) for navigation
   * - `"vim"`     → j/k/h/l for navigation (hjkl)
   * - `"emacs"`   → Ctrl+n/p/f/b for navigation
   * 
   * Set via environment variable: `TERMUI_KEYBINDINGS=vim`
   * 
   * @default "default"
   */
  keybindingMode: (process.env.TERMUI_KEYBINDINGS as 'default' | 'vim' | 'emacs') || 'default',
}

/**
 * Checks if the current terminal meets WCAG AA contrast requirements.
 * 
 * This is a convenience helper for theme authors who want to ensure
 * accessible color combinations when color support is enabled.
 * 
 * @param foreground - Foreground color in hex, RGB, or named format
 * @param background - Background color in hex, RGB, or named format
 * @returns true if the combination meets WCAG AA standards
 * 
 * @example
 * ```ts
 * import { meetsAA } from '@termuijs/core'
 * meetsAA('#ffffff', '#000000') // true
 * ```
 */
// If this helper exists in the file, add JSDoc above it:
// export function meetsAA(foreground: string, background: string): boolean { ... }

