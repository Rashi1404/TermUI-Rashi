import { describe, it, expect, vi } from 'vitest';
import { Buffer } from 'node:buffer';
import { Screen, createKeyEvent, type KeyEvent } from '@termuijs/core';
import { ConfirmDialog } from './ConfirmDialog.js';

function makeKey(key: string): KeyEvent {
    return createKeyEvent({ key, ctrl: false, shift: false, alt: false, raw: Buffer.from(key) });
}

function renderDialog(dialog: ConfirmDialog): Screen {
    const screen = new Screen(40, 10);
    dialog.updateRect({ x: 0, y: 0, width: 40, height: 10 });
    dialog.render(screen);
    return screen;
}

describe('ConfirmDialog', () => {
    it('Escape invokes cancel callback when visible', () => {
        const onCancel = vi.fn();
        const onConfirm = vi.fn();
        const dialog = new ConfirmDialog({ message: 'Continue?', onCancel, onConfirm });
        dialog.show();
        renderDialog(dialog);

        dialog.events.emit('key', makeKey('escape'));

        expect(onCancel).toHaveBeenCalled();
        expect(onConfirm).not.toHaveBeenCalled();
        expect(dialog.visible).toBe(false);
    });

    it('Escape does nothing when hidden', () => {
        const onCancel = vi.fn();
        const dialog = new ConfirmDialog({ message: 'Continue?', onCancel });
        renderDialog(dialog);

        dialog.events.emit('key', makeKey('escape'));

        expect(onCancel).not.toHaveBeenCalled();
        expect(dialog.visible).toBe(false);
    });
});
