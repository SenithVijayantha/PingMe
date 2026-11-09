import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ArrowLeft } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import icon from "../assets/icon.svg";
import type { UserCredentials } from "../types";
import { Button } from "../components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

// Static markup is reused instead of being rebuilt on every keystroke.
const hero = (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <img src={icon} alt="" className="size-10" />
      <h1 className="font-heading text-4xl font-semibold tracking-widest uppercase sm:text-5xl">
        PingMe
      </h1>
    </div>
    <p className="max-w-md text-muted-foreground">
      Connect, share, and explore with PingMe. A simple place to keep your
      conversations going.
    </p>
  </div>
);

const LoginPage = () => {
  const [currentState, setCurrentState] = useState<"Sign Up" | "Login">(
    "Sign Up"
  );
  const [userCredentials, setUserCredentials] = useState<UserCredentials>({
    fullName: "",
    email: "",
    password: "",
    bio: "",
  });
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useAuth();

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentState === "Sign Up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    void login(
      currentState === "Sign Up" ? "signup" : "login",
      userCredentials
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2">
        {/* Hero */}
        {hero}

        {/* Auth card */}
        <Card className="w-full max-w-md justify-self-center lg:justify-self-end">
          <CardHeader>
            <CardTitle>{currentState}</CardTitle>
            <CardDescription>
              {currentState === "Sign Up"
                ? isDataSubmitted
                  ? "Tell us a little about yourself."
                  : "Create an account to start chatting."
                : "Welcome back. Sign in to continue."}
            </CardDescription>
            {isDataSubmitted && (
              <CardAction>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Back"
                  onClick={() => setIsDataSubmitted(false)}
                >
                  <ArrowLeft />
                </Button>
              </CardAction>
            )}
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {currentState === "Sign Up" && !isDataSubmitted && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={userCredentials.fullName}
                    onChange={handleFieldChange}
                    placeholder="Full Name"
                    autoComplete="name"
                    required
                  />
                </div>
              )}

              {!isDataSubmitted && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={userCredentials.email}
                      onChange={handleFieldChange}
                      placeholder="Email"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      value={userCredentials.password}
                      onChange={handleFieldChange}
                      placeholder="Password"
                      autoComplete={
                        currentState === "Sign Up"
                          ? "new-password"
                          : "current-password"
                      }
                      required
                    />
                  </div>
                </>
              )}

              {currentState === "Sign Up" && !isDataSubmitted && (
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    name="terms"
                    defaultChecked
                    required
                    className="mt-0.5"
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-normal tracking-normal normal-case text-muted-foreground"
                  >
                    Agree to the terms of use & privacy policy.
                  </Label>
                </div>
              )}

              {currentState === "Sign Up" && isDataSubmitted && (
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={userCredentials.bio}
                    onChange={handleFieldChange}
                    placeholder="Tell us about yourself"
                  />
                </div>
              )}

              <Button type="submit" className="w-full">
                {currentState === "Sign Up"
                  ? isDataSubmitted
                    ? "Create Account"
                    : "Continue"
                  : "Login Now"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                {currentState === "Sign Up"
                  ? "Already have an account? "
                  : "Create an account "}
                <button
                  type="button"
                  onClick={() => {
                    setCurrentState((prev) =>
                      prev === "Sign Up" ? "Login" : "Sign Up"
                    );
                    setIsDataSubmitted(false);
                  }}
                  className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
                >
                  {currentState === "Sign Up" ? "Login here" : "Click here"}
                </button>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
