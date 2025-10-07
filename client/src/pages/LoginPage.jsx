import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

const LoginPage = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [userCredentials, setUserCredentials] = useState({
    fullName: "",
    email: "",
    password: "",
    bio: "",
  });
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentState === "Sign Up" && isDataSubmitted === false) {
      setIsDataSubmitted(true);
      return;
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse gap-8">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">PingMe</h1>
          <p className="py-6 max-w-lg">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-semibold ">{currentState}</h2>{" "}
              {isDataSubmitted && (
                <ArrowLeft onClick={() => setIsDataSubmitted(false)} className="cursor-pointer btn btn-sm p-1 btn-circle" />
              )}
            </div>
            <form action="" onSubmit={handleSubmit}>
              <fieldset className="fieldset">
                {currentState === "Sign Up" && isDataSubmitted === false && (
                  <>
                    <label className="label">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={userCredentials.fullName}
                      className="input"
                      placeholder="Full Name"
                      required
                      onChange={(e) =>
                        setUserCredentials({
                          ...userCredentials,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </>
                )}
                {isDataSubmitted === false && (
                  <>
                    <label className="label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={userCredentials.email}
                      className="input"
                      placeholder="Email"
                      required
                      onChange={(e) =>
                        setUserCredentials({
                          ...userCredentials,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </>
                )}
                {isDataSubmitted === false && (
                  <>
                    <label className="label">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={userCredentials.password}
                      className="input"
                      placeholder="Password"
                      required
                      onChange={(e) =>
                        setUserCredentials({
                          ...userCredentials,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </>
                )}
                {currentState === "Sign Up" && isDataSubmitted === false && (
                  <div className="mt-4">
                    <fieldset>
                      <label className="label">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="checkbox"
                          required
                        />
                        Agree to the terms of use & privacy policy.
                      </label>
                    </fieldset>
                  </div>
                )}
                {currentState === "Sign Up" && isDataSubmitted === true && (
                  <textarea
                    name="bio"
                    value={userCredentials.bio}
                    className="textarea w-full resize-none"
                    placeholder="Bio"
                    
                    onChange={(e) =>
                      setUserCredentials({
                        ...userCredentials,
                        [e.target.name]: e.target.value,
                      })
                    }
                  ></textarea>
                )}
                {currentState === "Sign Up" ? (
                  <p>
                    Already have an account?{" "}
                    <span
                      onClick={() => {
                        setCurrentState("Login");
                        setIsDataSubmitted(false);
                      }}
                      className="text-accent cursor-pointer"
                    >
                      Login here
                    </span>
                  </p>
                ) : (
                  <p>
                    Create an account{" "}
                    <span
                      onClick={() => setCurrentState("Sign Up")}
                      className="text-accent cursor-pointer"
                    >
                      Click here
                    </span>
                  </p>
                )}
                <button className="btn btn-neutral mt-4">
                  {currentState === "Sign Up" ? "Create Account" : "Login Now"}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
