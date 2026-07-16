# Implement Missing Design Tokens & UI Polish

**Goal:** Bring the app to a premium, fully‑styled state by adding missing design tokens, exporting them, refining the theme, completing the `GlassCard` component, and building a robust Settings screen that includes dark‑mode toggling, notification preferences, and basic account options while persisting the theme choice.

## User Review Required
> [!IMPORTANT]
> The plan introduces new design token files (`borderRadius.ts`, `shadow.ts`) and updates numerous imports. It also adds a new Settings screen with additional options and persists theme selection using AsyncStorage. Please confirm you are OK with these structural changes.

## Open Questions Resolved
> [!NOTE]
> - **Settings screen content:** Includes dark/light mode toggle **plus** notification toggle (enable/disable alerts) and a placeholder for account settings (e.g., email display).
> - **Theme persistence:** Theme choice will be saved to AsyncStorage immediately, ensuring the preference survives app restarts.

## Proposed Changes
---
### Theme Tokens
- **[NEW]** `src/theme/borderRadius.ts` – export `BorderRadius` object with values (xs, sm, md, lg, xl, full).
- **[NEW]** `src/theme/shadow.ts` – export `Shadow` object with presets (`sm`, `md`, `lg`).
- **[MODIFY]** `src/theme/index.ts` – add `export * from './borderRadius'; export * from './shadow';`.
- **[MODIFY]** `src/theme/colors.ts` – add `glassBackground` and `glassBorder` definitions for glass‑morphism cards.

### GlassCard Component
- **[MODIFY]** `src/components/GlassCard.tsx` – replace hard‑coded style values with the new tokens (`BorderRadius`, `Shadow`).
- Ensure the component uses `colors.glassBackground` and `colors.glassBorder` from the theme.

### Settings Screen
- **[NEW]** `src/screens/Settings/SettingsScreen.tsx` – a screen with:
  - Dark/Light mode toggle (using `useTheme` hook and `themeStore` update).
  - Notification toggle (boolean stored in a new `settingsStore`).
  - Simple account section showing user email (placeholder) and a logout button.
  - Layout using `GlassCard` for visual consistency.
- **[MODIFY]** `src/navigation/AppNavigator.tsx` – add a new route `SettingsScreen` under the Profile stack.

### State & Persistence
- **[NEW]** `src/store/themeStore.ts` – a Zustand store handling `isDarkMode` boolean, a `toggleTheme` action, and loading/saving the value to AsyncStorage.
- **[NEW]** `src/store/settingsStore.ts` – a simple store for `notificationsEnabled` and other future preferences.
- **[MODIFY]** `src/theme/useTheme.ts` – read from `themeStore`, apply persisted mode, and expose `colors` based on mode.

### UI Polish
- Update imports across the app to use the new tokens (`BorderRadius`, `Shadow`).
- Replace any hard‑coded color literals in screens/components with theme references.
- Ensure `Typography.tsx` uses the Google Font *Nunito* (already loaded) and respects theme colors.

## Verification Plan
### Automated Tests
- Add a test in `__tests__/theme.test.ts` that verifies `useTheme` returns correct colors for both modes and that AsyncStorage persistence works.
- Snapshot test for `GlassCard` rendering with dark and light themes.
- Unit test for `SettingsScreen` toggles updating stores correctly.

### Manual Verification
- Run the app on a simulator, open Settings, toggle dark mode, and confirm UI updates instantly.
- Verify that the chosen theme persists after restarting the app.
- Test notification toggle persists within the session.
- Navigate through all screens to ensure no missing imports cause crashes.

---
*After you approve, I will create `task.md` and start implementing the changes.*
