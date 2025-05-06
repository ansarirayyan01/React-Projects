import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Logo, Input } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {register, handleSubmit, formState: { errors }, setValue} = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubscriber, setIsSubscriber] = useState(false);
  
  // Check if user came from newsletter subscription
  useEffect(() => {
    const subscriberEmail = localStorage.getItem("subscriberEmail");
    if (subscriberEmail) {
      setValue("email", subscriberEmail);
      setIsSubscriber(true);
    }
  }, [setValue]);

  const login = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        
        // If user came from subscription, redirect to all-posts and clear localStorage
        if (isSubscriber) {
          localStorage.removeItem("subscriberEmail");
          navigate("/all-posts");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-[80vh] py-10">
      <div
        className="mx-auto w-full max-w-md bg-white rounded-xl p-8 shadow-xl"
      >
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-secondary-900 mb-1">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-base text-secondary-600 mb-8">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary-600 transition-all duration-200 hover:text-primary-700 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {isSubscriber && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            Sign in to access your subscription and all blog posts!
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit(login)} className="space-y-6">
          <div>
            <Input
              label="Email"
              placeholder="name@example.com"
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-primary-600 hover:text-primary-700 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
