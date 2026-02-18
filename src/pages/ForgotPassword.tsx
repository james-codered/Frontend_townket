import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // For now just simulate success
    setMessage("If this email exists, a reset link has been sent.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm">
        <h1 className="text-xl font-bold">Forgot Password</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label>Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>

          {message && (
            <p className="text-green-600 text-sm mt-2">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
