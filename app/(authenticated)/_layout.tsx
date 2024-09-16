import { Slot } from "expo-router";
import { useEffect } from "react";
import { setStatusBarStyle } from "expo-status-bar";

export default function Layout() {
    useEffect(() => {
        setStatusBarStyle("dark");
    }, []);
    return <Slot />;
}
