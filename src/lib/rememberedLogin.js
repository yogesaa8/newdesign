const REMEMBERED_LOGIN_KEY = "jobPortalRememberedLogins";

const readRememberedLogins = () => {
  try {
    const value = localStorage.getItem(REMEMBERED_LOGIN_KEY);
    return value ? JSON.parse(value) : {};
  } catch {
    return {};
  }
};

export const getRememberedLogin = (role) => {
  const remembered = readRememberedLogins();
  return remembered?.[role] || { email: "", remember: false };
};

export const saveRememberedLogin = (role, email, remember) => {
  const remembered = readRememberedLogins();

  if (remember) {
    localStorage.setItem(
      REMEMBERED_LOGIN_KEY,
      JSON.stringify({
        ...remembered,
        [role]: {
          email,
          remember: true,
        },
      })
    );
    return;
  }

  delete remembered[role];
  localStorage.setItem(REMEMBERED_LOGIN_KEY, JSON.stringify(remembered));
};
