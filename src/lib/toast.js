import hotToast from "react-hot-toast";

const DEFAULT_DEDUPE_WINDOW_MS = 1500;
const recentToasts = new Map();

const getMessageKey = (message) => {
  if (typeof message === "string" || typeof message === "number") {
    return String(message).trim();
  }

  if (Array.isArray(message)) {
    return message.map(getMessageKey).join("|");
  }

  if (message?.props?.children) {
    return getMessageKey(message.props.children);
  }

  return String(message);
};

const showDedupedToast = (type, showToast, message, options = {}) => {
  const {
    dedupe = true,
    dedupeKey,
    dedupeWindow = DEFAULT_DEDUPE_WINDOW_MS,
    ...toastOptions
  } = options || {};

  if (!dedupe || toastOptions.id) {
    return showToast(message, toastOptions);
  }

  const key = dedupeKey || `${type}:${getMessageKey(message)}`;
  const now = Date.now();
  const existing = recentToasts.get(key);

  if (existing && now - existing.timestamp < dedupeWindow) {
    return existing.id;
  }

  const id = showToast(message, toastOptions);
  recentToasts.set(key, { id, timestamp: now });

  globalThis.setTimeout(() => {
    const current = recentToasts.get(key);
    if (current?.id === id) {
      recentToasts.delete(key);
    }
  }, dedupeWindow);

  return id;
};

const toast = (message, options) =>
  showDedupedToast("blank", hotToast, message, options);

toast.success = (message, options) =>
  showDedupedToast("success", hotToast.success, message, options);

toast.error = (message, options) =>
  showDedupedToast("error", hotToast.error, message, options);

toast.loading = (message, options) =>
  showDedupedToast("loading", hotToast.loading, message, options);

toast.custom = hotToast.custom;
toast.dismiss = hotToast.dismiss;
toast.remove = hotToast.remove;
toast.promise = hotToast.promise;

export default toast;
