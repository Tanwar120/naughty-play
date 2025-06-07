import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { GradientButton } from "@/components/ui/gradient-button";
import { useAuth } from "@/hooks/use-auth";
import { getPasswordStrength } from "@/lib/utils";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<"weak" | "medium" | "strong">("weak");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { register: registerUser } = useAuth();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const password = watch("password");
  
  useEffect(() => {
    if (password) {
      setPasswordStrength(getPasswordStrength(password));
    }
  }, [password]);
  
  useEffect(() => {
    document.title = "Register | NOUGHTYPLAY";
  }, []);
  
  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    
    try {
      await registerUser(data.username, data.email, data.password);
      
      toast({
        title: "Registration Successful",
        description: "Welcome to NOUGHTYPLAY! Your account and wallet have been created.",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const getStrengthColor = () => {
    switch (passwordStrength) {
      case "weak":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "strong":
        return "bg-green-500";
      default:
        return "bg-red-500";
    }
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-md mx-auto glass p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="font-space font-bold text-3xl mb-2">Create Account</h1>
            <p className="text-gray-300">
              Join NOUGHTYPLAY and start your crypto gaming journey
            </p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-gray-300 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                {...register("username")}
                className="w-full bg-dark py-2 px-3 rounded border border-purple-secondary/30 focus:border-purple-secondary outline-none"
                placeholder="Choose a username"
              />
              {errors.username && (
                <p className="mt-1 text-red-500 text-sm">{errors.username.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full bg-dark py-2 px-3 rounded border border-purple-secondary/30 focus:border-purple-secondary outline-none"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                className="w-full bg-dark py-2 px-3 rounded border border-purple-secondary/30 focus:border-purple-secondary outline-none"
                placeholder="Create a password"
              />
              {password && (
                <div className="mt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-300">Password strength:</span>
                    <span className="text-xs capitalize">
                      {passwordStrength === "weak" && <span className="text-red-500">Weak</span>}
                      {passwordStrength === "medium" && <span className="text-yellow-500">Medium</span>}
                      {passwordStrength === "strong" && <span className="text-green-500">Strong</span>}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getStrengthColor()}`}
                      style={{ 
                        width: passwordStrength === "weak" 
                          ? "33%" 
                          : passwordStrength === "medium" 
                            ? "66%" 
                            : "100%" 
                      }}
                    ></div>
                  </div>
                </div>
              )}
              {errors.password && (
                <p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                className="w-full bg-dark py-2 px-3 rounded border border-purple-secondary/30 focus:border-purple-secondary outline-none"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-purple-secondary focus:ring-purple-secondary"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                I agree to the{" "}
                <a href="#terms" className="text-purple-secondary hover:text-purple-400">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#privacy" className="text-purple-secondary hover:text-purple-400">
                  Privacy Policy
                </a>
              </label>
            </div>
            
            <GradientButton
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <i className="fas fa-spinner fa-spin mr-2"></i> Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </GradientButton>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Already have an account?{" "}
              <Link href="/login">
                <a className="text-purple-secondary hover:text-purple-400">
                  Login
                </a>
              </Link>
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-purple-secondary/20">
            <div className="bg-dark-slate/40 p-4 rounded-lg">
              <h4 className="text-[#00FFFF] font-medium text-sm mb-2">
                <i className="fas fa-info-circle mr-1"></i> Creating a new account will:
              </h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mr-2 mt-0.5"></i>
                  Generate a secure crypto wallet for you
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mr-2 mt-0.5"></i>
                  Give you full access to all casino games and sports betting
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mr-2 mt-0.5"></i>
                  Allow you to trade cryptocurrencies on our exchange
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
