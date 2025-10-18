import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Login } from "../Redux/Features/AuthenticationServicesSlice";
export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    remember: false,
    userType: "", // Default value for the dropdown
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  //submit data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await dispatch(Login(formData)).unwrap();

      if (res.status === "success") {
        // clear errors
        setApiError("");

        // navigate to dashboard
        navigate("/seller/Dashboard/home");
        // reset form
        setFormData({
          identifier: "",
          password: "",
          remember: false,
          userType: "",
        });
      } else {
        // ✅ Failed case

        setApiError(res.message || "Login failed");
      }
    } catch (err) {
      // if API call itself breaks (network/server error)
      setApiError(err.message || "Something went wrong. Please try again.");
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.identifier) {
      newErrors.identifier = "Email OR Phone  is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true = valid
  };

  //check if they already login after this page back so thiss page not show
  useEffect(() => {
    // Check if token exists in localStorage (for "remember me" functionality)
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      // If token exists, redirect to dashboard
      navigate("/Dashboard/home", { replace: true });
    }
  }, [navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-lg shadow-xl">
        {/* Logo Section */}
        <div className="flex justify-center">
          <img className="h-24 w-auto sm:h-28" src="Logo.png" alt="Logo" />
        </div>
        {/* Form Title */}
        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        {apiError && <p className="text-red-600 text-center ">{apiError}</p>}
        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="identifier" className="sr-only">
                identifier
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 "
                placeholder="Email or Phoneno"
                value={formData.identifier}
                onChange={handleChange}
              />
              {errors.identifier && (
                <p className="text-red-500 text-sm">{errors.identifier}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 "
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={formData.remember}
                onChange={handleChange}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          {errors.remember && (
            <p className="text-red-500 text-sm">{errors.remember}</p>
          )}

          {/* 🔗 Login Link */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/seller/register"
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              Register
            </Link>
          </p>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
