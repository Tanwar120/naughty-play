import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { GradientButton } from "@/components/ui/gradient-button";
import { useAuth } from "@/hooks/use-auth";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  
  useEffect(() => {
    document.title = "Login | NOUGHTYPLAY";
  }, []);
  
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      await login(data.username, data.password);
      
      toast({
        title: "Login Successful",
        description: "Welcome back to NOUGHTYPLAY!",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
            <h1 className="font-space font-bold text-3xl mb-2">Welcome Back</h1>
            <p className="text-gray-300">
              Login to your NOUGHTYPLAY account
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
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="mt-1 text-red-500 text-sm">{errors.username.message}</p>
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
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-purple-secondary focus:ring-purple-secondary"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <a href="#forgot-password" className="text-sm text-purple-secondary hover:text-purple-400">
                Forgot password?
              </a>
            </div>
            
            <GradientButton
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <i className="fas fa-spinner fa-spin mr-2"></i> Logging in...
                </span>
              ) : (
                "Login"
              )}
            </GradientButton>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Don't have an account?{" "}
              <Link href="/register">
                <a className="text-purple-secondary hover:text-purple-400">
                  Register now
                </a>
              </Link>
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-purple-secondary/20">
            <p className="text-sm text-gray-400 text-center mb-4">
              Or continue with
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center p-2 border border-purple-secondary/30 rounded-lg hover:bg-purple-secondary/10 transition-colors">
                <i className="fab fa-google text-lg mr-2"></i> Google
              </button>
              <button className="flex items-center justify-center p-2 border border-purple-secondary/30 rounded-lg hover:bg-purple-secondary/10 transition-colors">
                <i className="fab fa-twitter text-lg mr-2"></i> Twitter
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
