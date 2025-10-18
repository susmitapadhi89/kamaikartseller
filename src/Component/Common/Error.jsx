import React, { useState } from "react";
import { FiAlertTriangle, FiX, FiRefreshCw, FiInfo } from "react-icons/fi";

export const ErrorMessage = ({
  message,
  onRetry,
  variant = "error",
  dismissible = false,
  className = "",
  title,
  autoDismiss = false,
  dismissTimeout = 5000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Define styles based on variant
  const variants = {
    error: {
      borderColor: "border-red-400",
      iconColor: "text-red-500",
      bgColor: "bg-red-50",
      textColor: "text-red-800",
      title: "Error",
      icon: <FiAlertTriangle className="text-red-500 text-xl" />,
    },
    warning: {
      borderColor: "border-amber-400",
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50",
      textColor: "text-amber-800",
      title: "Warning",
      icon: <FiAlertTriangle className="text-amber-500 text-xl" />,
    },
    info: {
      borderColor: "border-blue-400",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-800",
      title: "Information",
      icon: <FiInfo className="text-blue-500 text-xl" />,
    },
    success: {
      borderColor: "border-emerald-400",
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-800",
      title: "Success",
      icon: <FiInfo className="text-emerald-500 text-xl" />,
    },
  };

  // Auto dismiss after timeout
  React.useEffect(() => {
    if (autoDismiss && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, dismissTimeout);

      return () => clearTimeout(timer);
    }
  }, [autoDismiss, dismissTimeout, isVisible]);

  const currentVariant = variants[variant] || variants.error;

  if (!isVisible) return null;

  return (
    <div
      className={`rounded-lg border-l-4 ${currentVariant.borderColor} ${currentVariant.bgColor} p-4 shadow-sm animate-fadeIn ${className}`}
    >
      <div className="flex items-start">
        <div
          className={`flex-shrink-0 ${currentVariant.iconColor} mr-3 mt-0.5`}
        >
          {currentVariant.icon}
        </div>

        <div className="flex-1">
          <h3 className={`text-sm font-medium ${currentVariant.textColor}`}>
            {title || currentVariant.title}
          </h3>
          <div className={`mt-1 text-sm ${currentVariant.textColor}`}>
            <p>{message || "Something went wrong. Please try again."}</p>
          </div>

          {onRetry && (
            <div className="mt-3">
              <button
                type="button"
                className={`inline-flex items-center text-sm font-medium ${currentVariant.textColor} hover:underline focus:outline-none`}
                onClick={onRetry}
              >
                <FiRefreshCw className="mr-1.5 h-4 w-4" />
                Try again
              </button>
            </div>
          )}
        </div>

        {dismissible && (
          <div className="ml-4 flex flex-shrink-0">
            <button
              className={`inline-flex rounded-md ${currentVariant.bgColor} ${
                currentVariant.textColor
              } hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${
                currentVariant.bgColor.split("-")[1]
              }-50 focus:ring-${currentVariant.textColor.split("-")[1]}-500`}
              onClick={() => setIsVisible(false)}
            >
              <span className="sr-only">Dismiss</span>
              <FiX className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
