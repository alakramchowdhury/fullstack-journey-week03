/* =====================================================================
   DAY 20 · js/storage.js · Save and load any value in localStorage
   ---------------------------------------------------------------------
   localStorage only stores STRINGS, so values go through JSON:
     save: value → JSON.stringify → string → localStorage.setItem
     load: localStorage.getItem → string → JSON.parse → value
   Both are wrapped in try / catch: storage can be full, blocked (some
   private windows) or hold broken JSON. The widget must still work.
   ===================================================================== */

export function load(key, fallback) {
  try {
    const text = localStorage.getItem(key);
    return text === null ? fallback : JSON.parse(text);   // null = nothing saved yet
  } catch (error) {
    console.warn(`Could not load "${key}":`, error.message);
    return fallback;
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Could not save "${key}":`, error.message);
  }
}
