const API_URL = "https://townketbackend.onrender.com";

const login = useCallback(
  async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password, 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Login failed");
      }

      setState({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw new Error(error?.message || "Something went wrong");
    }
  },
  []
);

const signup = useCallback(
  async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email,
          password,
          role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Signup failed");
      }

      setState({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw new Error(error?.message || "Something went wrong");
    }
  },
  []
);
