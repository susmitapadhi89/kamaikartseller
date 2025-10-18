import React, { useState } from "react";
//import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export const SellerSetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //const dispatch = useDispatch();

  // Token link mathi avse

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must be at least 6 characters, include uppercase, lowercase, number & special character!"
      );
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    setLoading(true);
    try {
      // await dispatch(SetPassword({ token, password })).unwrap();
      toast.success("🎉 Password set successfully!");
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("❌ Invalid or expired link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Set Your Password
        </h1>
        <p className="text-gray-500 mb-6 text-sm">
          Create a strong password to activate your seller account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring focus:ring-blue-500"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring focus:ring-blue-500"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Setting..." : "Set Password"}
          </button>
        </form>
        <div className="mb-4">
          <ul className="text-xs mt-2 space-y-1 list-disc list-inside">
            <li
              className={
                password.length >= 6 ? "text-green-600" : "text-red-500"
              }
            >
              Minimum 6 characters
            </li>
            <li
              className={
                /[A-Z]/.test(password) ? "text-green-600" : "text-red-500"
              }
            >
              At least 1 uppercase letter (A-Z)
            </li>
            <li
              className={
                /[a-z]/.test(password) ? "text-green-600" : "text-red-500"
              }
            >
              At least 1 lowercase letter (a-z)
            </li>
            <li
              className={
                /\d/.test(password) ? "text-green-600" : "text-red-500"
              }
            >
              At least 1 number (0-9)
            </li>
            <li
              className={
                /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
                  ? "text-green-600"
                  : "text-red-500"
              }
            >
              At least 1 special character (!@#$%^&*)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
