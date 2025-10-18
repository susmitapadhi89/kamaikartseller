import { useState } from "react";

export const PasswordChange = () => {
  const [step, setStep] = useState(1); // 1: password form, 2: OTP verification
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("user@example.com"); // Replace with actual user email
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validatePasswordForm = () => {
    const newErrors = {};
    if (!formData.oldPassword)
      newErrors.oldPassword = "Current password is required";
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (validatePasswordForm()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep(2);
        setMessage("OTP has been sent to your registered email");
      }, 1500);
    }
  };

  const validateOtpForm = () => {
    if (!otp) {
      setErrors({ otp: "OTP is required" });
      return false;
    } else if (otp.length !== 6) {
      setErrors({ otp: "OTP must be 6 digits" });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (validateOtpForm()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setMessage("Password changed successfully!");
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        setOtp("");
        setStep(1);
      }, 1500);
    }
  };

  const resendOtp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMessage("New OTP has been sent to your email");
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
      {/* Header */}

      <div>
        <h1>fdhisfisdfjse</h1>
      </div>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-lock text-indigo-600 text-2xl"></i>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          {step === 1 ? "Change Password" : "Verify OTP"}
        </h1>
        <p className="text-gray-600 mt-2">
          {step === 1
            ? "Please enter your current and new password"
            : "Enter the OTP sent to your registered email"}
        </p>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-4 p-3 rounded-lg text-center ${
            message.includes("successfully")
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* Step 1: Password Form */}
      {step === 1 ? (
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          {/** Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={formData.oldPassword}
                onChange={(e) =>
                  setFormData({ ...formData, oldPassword: e.target.value })
                }
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.oldPassword
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-indigo-200 focus:border-indigo-500"
                }`}
                placeholder="Enter current password"
              />
              <i className="fas fa-lock absolute right-3 top-3 text-gray-400"></i>
            </div>
            {errors.oldPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.oldPassword}</p>
            )}
          </div>

          {/** New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.newPassword
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-indigo-200 focus:border-indigo-500"
                }`}
                placeholder="Enter new password"
              />
              <i className="fas fa-key absolute right-3 top-3 text-gray-400"></i>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
            )}
          </div>

          {/** Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-indigo-200 focus:border-indigo-500"
                }`}
                placeholder="Confirm new password"
              />
              <i className="fas fa-key absolute right-3 top-3 text-gray-400"></i>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Processing...
              </>
            ) : (
              "Send OTP"
            )}
          </button>
        </form>
      ) : (
        /** Step 2: OTP Verification */
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-blue-800">
              <i className="fas fa-info-circle mr-1"></i>
              OTP has been sent to your registered email address:{" "}
              <span className="font-semibold">{email}</span>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter OTP
            </label>
            <div className="relative">
              <input
                type="text"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/, "").slice(0, 6))
                }
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.otp
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-indigo-200 focus:border-indigo-500"
                }`}
                placeholder="Enter 6-digit OTP"
              />
              <i className="fas fa-shield-alt absolute right-3 top-3 text-gray-400"></i>
            </div>
            {errors.otp && (
              <p className="text-red-500 text-xs mt-1">{errors.otp}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Verifying...
              </>
            ) : (
              "Change Password"
            )}
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={resendOtp}
              disabled={isLoading}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              {isLoading ? "Sending..." : "Resend OTP"}
            </button>
          </div>

          <div className="text-center mt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              <i className="fas fa-arrow-left mr-1"></i> Back to password form
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
