import { useEffect } from "react";
import { startLoading, useAssetStore } from "./stores/useAssetStore";

export default function Loading({ children }) {
    const isLoaded = useAssetStore((state) => state.isLoaded);

    useEffect(() => {
        startLoading();
    }, []);

    return <>{isLoaded ? children : null}</>
}