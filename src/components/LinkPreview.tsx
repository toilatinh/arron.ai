import React, { useState, useEffect } from "react";

interface LinkPreviewProps {
    url: string;
    onLoad?: () => void;
}

interface PreviewData {
    title?: string;
    description?: string;
    image?: { url: string };
    publisher?: string;
    logo?: { url: string };
}

export function LinkPreview({ url, onLoad }: LinkPreviewProps) {
    const [data, setData] = useState<PreviewData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(false);

        const fetchPreview = async () => {
            try {
                const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
                if (!response.ok) throw new Error("Failed to fetch preview");
                const json = await response.json();
                if (json.status === "success" && isMounted) {
                    setData(json.data);
                } else {
                    setError(true);
                }
            } catch (err) {
                if (isMounted) setError(true);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchPreview();

        return () => {
            isMounted = false;
        };
    }, [url]);

    useEffect(() => {
        if (!loading) {
            // Small timeout to allow render to complete
            const timer = setTimeout(() => {
                onLoad?.();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [loading, onLoad]);

    if (loading) {
        return (
            <div className="mt-2 w-full max-w-sm rounded-[16px] border border-gray-200 bg-gray-50 p-4 animate-pulse">
                <div className="h-32 w-full bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            </div>
        );
    }

    if (error || !data) return null;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block w-full max-w-sm overflow-hidden rounded-[16px] border border-gray-200 bg-white transition-all hover:bg-gray-50 hover:shadow-sm no-underline"
            style={{ textDecoration: 'none' }}
        >
            {data.image?.url && (
                <div className="h-40 w-full overflow-hidden">
                    <img
                        src={data.image.url}
                        alt={data.title || "Link preview"}
                        className="h-full w-full object-cover"
                    />
                </div>
            )}
            <div className="p-4">
                {data.title && (
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight">
                        {data.title}
                    </h3>
                )}
            </div>
        </a>
    );
}
