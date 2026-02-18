import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, ShoppingBag, UserPlus } from "lucide-react";

const SignupCustomer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setError("Backend not connected. Please integrate authentication API.");
    setLoading(false);
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

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint/30 text-xs font-medium mb-4">
          <ShoppingBag className="w-3 h-3" />
          Customer Account
        </div>
        <h1 className="text-xl font-display font-bold">Join Townket</h1>
        <p className="text-sm text-muted-foreground mt-1">Discover local products & services</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Full Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1" />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <Button type="submit" className="w-full gap-2" disabled={loading}>
            <UserPlus className="w-4 h-4" />
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-foreground font-medium hover:underline">Log in</Link>
        </p>
        <p className="text-center text-xs text-muted-foreground mt-2">
          Want to sell?{" "}
          <Link to="/signup/entrepreneur" className="text-foreground font-medium hover:underline">Sign up as entrepreneur</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupCustomer;
