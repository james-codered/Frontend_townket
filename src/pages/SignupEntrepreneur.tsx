import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Store, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const SignupEntrepreneur = () => {
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signup(name, email, password, "entrepreneur");
      // If you later want to send businessName to backend,
      // we can modify AuthContext to include it.
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 gradient-hero">
      <div className="card-soft w-full max-w-sm animate-fade-in">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold">Townket</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/30 text-xs font-medium mb-4">
          <Store className="w-3 h-3" />
          Entrepreneur Account
        </div>

        <h1 className="text-xl font-display font-bold">
          Create your business
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Start selling to your local community
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Full Name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Business Name
            </label>
            <Input
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
          <label className="text-xs font-medium text-muted-foreground">
          Password
           </label>
            <Input
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
              className="mt-1"
             />
            </div>
          {error && (
            <p className="text-xs text-destructive">{error}</p>
          )}

          <Button type="submit" className="w-full gap-2" disabled={loading}>
            <UserPlus className="w-4 h-4" />
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-foreground font-medium hover:underline"
          >
            Log in
          </Link>
        </p>

        <p className="text-center text-xs text-muted-foreground mt-2">
          Looking to buy?{" "}
          <Link
            to="/signup/customer"
            className="text-foreground font-medium hover:underline"
          >
            Sign up as customer
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupEntrepreneur;
