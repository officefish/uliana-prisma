import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

const usePageNotifications = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useLocalStorage(
        "notificationsEnabled",
        true // Notifications are enabled by default
    );

    const [closedPages, setClosedPages] = useLocalStorage("closedPages", []);

    const [currentPage, setCurrentPage] = useState<any>(null);

    // Function to determine whether to show the notification on the current page
    const shouldShowNotification = (pageId: string) => {
        if (!notificationsEnabled) return false; // Notifications disabled
        if (closedPages.includes(pageId)) return false; // Notification already closed
        return true;
    };

    // Function to close the notification for the current page
    const closeNotification = (pageId: string) => {
        setClosedPages((prev: any) => [...new Set([...prev, pageId])]);
    };

    // Function to reset notifications (e.g., when the user switches notifications back on)
    const resetNotifications = () => {
        setNotificationsEnabled(true);
        setClosedPages([]);
    };

    return {
        notificationsEnabled,
        setNotificationsEnabled,
        shouldShowNotification,
        closeNotification,
        resetNotifications,
        setCurrentPage,
        currentPage
    };
}
export default usePageNotifications;