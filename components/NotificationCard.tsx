import React from "react";
import Image from "next/image";

export interface NotificationCardProps {
  title: string;
  message: string;
  time: string;
  type?: "info" | "success" | "warning" | "error";
  isRead?: boolean;
  onMarkAsRead?: () => void;
  onClose?: () => void;
  icon?: string;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  message,
  time,
  type = "info",
  isRead = false,
  onMarkAsRead,
  onClose,
  icon,
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "border-l-4 border-green-500 bg-green-50";
      case "warning":
        return "border-l-4 border-yellow-500 bg-yellow-50";
      case "error":
        return "border-l-4 border-red-500 bg-red-50";
      case "info":
      default:
        return "border-l-4 border-blue-500 bg-blue-50";
    }
  };

  const getIconByType = () => {
    if (icon) return icon;

    switch (type) {
      case "success":
        return "/assets/icons/media/check-circle.svg";
      case "warning":
        return "/assets/icons/media/alert-triangle.svg";
      case "error":
        return "/assets/icons/media/alert-circle.svg";
      case "info":
      default:
        return "/assets/icons/media/info.svg";
    }
  };

  return (
    <div
      className={`p-4 mb-4 rounded-lg shadow-sm ${getTypeStyles()} ${
        !isRead ? "font-medium" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className="mr-3 mt-0.5">
            <Image src={getIconByType()} width={20} height={20} alt={type} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800">{title}</h4>
            <p className="text-sm text-gray-600 mt-1">{message}</p>
            <span className="text-xs text-gray-500 mt-2 block">{time}</span>
          </div>
        </div>

        <div className="flex items-center">
          {!isRead && onMarkAsRead && (
            <button
              onClick={onMarkAsRead}
              className="text-xs text-blue-600 hover:text-blue-800 mr-4"
            >
              Mark as read
            </button>
          )}

          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close notification"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
