import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

const Login = ({ role }: { role: "customer" | "entrepreneur" }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ correct place
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/market"); // your new route
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm">
        <h1 className="text-xl font-display font-bold">
  Login as {role === "customer" ? "Customer" : "Entrepreneur"}
</h1>
        <p className="text-sm text-muted-foreground mt-1">
  Access your Townket account
</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label>Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
<div className="flex justify-between items-center">
  <label className="text-xs font-medium text-muted-foreground">
    Password
  </label>

  <Link
    to="/forgot-password"
    className="text-xs text-muted-foreground hover:text-foreground"
  >
    Forgot password?
  </Link>
</div>
            <div className="relative mt-1">
  <Input
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    className="pr-16"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>
       
              
            </div>
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <Button type="submit" className="w-full gap-2" disabled={loading}>
         {loading ? "Logging in..." : "Login"}
       </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
