const login = useCallback(async (email: string, password: string) => {
  setState((s) => ({ ...s, isLoading: true }));

  try {
    const res = await fetch("https://townketbackend.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    setState({
      user: data.user,
      token: data.token,
      isAuthenticated: true,
      isLoading: false,
    });

  } catch (error: any) {
    setState((s) => ({ ...s, isLoading: false }));
    throw new Error(error.message);
  }
}, []);

const signup = useCallback(async (
  name: string,
  email: string,
  password: string,
  role: UserRole
) => {
  setState((s) => ({ ...s, isLoading: true }));

  try {
    const res = await fetch("https://townketbackend.onrender.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: name, email, password, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Signup failed");
    }

    setState({
      user: data.user,
      token: data.token,
      isAuthenticated: true,
      isLoading: false,
    });

  } catch (error: any) {
    setState((s) => ({ ...s, isLoading: false }));
    throw new Error(error.message);
  }
}, []);
