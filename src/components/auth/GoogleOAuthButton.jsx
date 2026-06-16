import { useEffect, useRef, useState } from "react";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

let googleScriptPromise;

const loadGoogleIdentityScript = () => {
  if (window.google?.accounts?.id) return Promise.resolve();

  if (!googleScriptPromise) {
    googleScriptPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector(
        `script[src="${GOOGLE_SCRIPT_SRC}"]`
      );

      if (existingScript) {
        existingScript.addEventListener("load", resolve, { once: true });
        existingScript.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = GOOGLE_SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  return googleScriptPromise;
};

const GoogleOAuthButton = ({
  onCredential,
  onError,
  disabled = false,
  text = "continue_with",
}) => {
  const buttonRef = useRef(null);
  const onCredentialRef = useRef(onCredential);
  const onErrorRef = useRef(onError);
  const disabledRef = useRef(disabled);
  const [status, setStatus] = useState(() =>
    GOOGLE_CLIENT_ID ? "loading" : "missing-client-id",
  );

  useEffect(() => {
    onCredentialRef.current = onCredential;
    onErrorRef.current = onError;
    disabledRef.current = disabled;
  }, [disabled, onCredential, onError]);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      return undefined;
    }

    let isMounted = true;

    loadGoogleIdentityScript()
      .then(() => {
        if (!isMounted || !buttonRef.current) return;

        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (response) => {
            if (disabledRef.current) return;

            if (response?.credential) {
              onCredentialRef.current?.(response.credential);
              return;
            }

            onErrorRef.current?.("Google did not return an ID token.");
          },
        });

        buttonRef.current.innerHTML = "";
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          text,
          shape: "rectangular",
          width: buttonRef.current.offsetWidth || 320,
        });
        setStatus("ready");
      })
      .catch(() => {
        if (!isMounted) return;
        setStatus("failed");
      });

    return () => {
      isMounted = false;
    };
  }, [text]);

  if (status === "missing-client-id") {
    return (
      <button
        type="button"
        disabled
        className="flex w-full cursor-not-allowed items-center justify-center rounded-[8px] border border-[#EADFD9] bg-[#F7F5F2] px-4 py-3 text-sm font-semibold text-[#9F9FA9]"
      >
        Google Client ID missing
      </button>
    );
  }

  if (status === "failed") {
    return (
      <button
        type="button"
        disabled
        className="flex w-full cursor-not-allowed items-center justify-center rounded-[8px] border border-[#EADFD9] bg-[#F7F5F2] px-4 py-3 text-sm font-semibold text-[#9F9FA9]"
      >
        Google sign-in unavailable
      </button>
    );
  }

  return (
    <div
      className={`min-h-[44px] w-full ${disabled ? "pointer-events-none opacity-70" : ""}`}
      ref={buttonRef}
    />
  );
};

export default GoogleOAuthButton;
