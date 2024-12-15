//import { SyntheticEvent, useCallback, useEffect } from "react";
//import { apiFetch } from "@/services/api";
//import { useUserStore } from "@/providers/user";
//import { useGameplayTick } from "./api/useGameplayTick";
//import { useTapsStore } from "@/providers/tap";

import { useState } from "react";

const useLocalStorage = (key: string, initialValue: any) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error accessing localStorage:", error);
            return initialValue;
        }
    });

    const setValue = (value: string | Function) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error("Error setting localStorage:", error);
        }
    };

    return [storedValue, setValue];
}

   

export default useLocalStorage;