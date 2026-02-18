import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://townketbackend.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Something went wrong");
    }
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
        </form>

        {message && (
          <p className="text-sm text-center mt-4">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
