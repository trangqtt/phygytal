import { gaApiKey } from "@/constant";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
    (window as any)?.gtag("config", gaApiKey, {
        page_path: url,
    });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: any) => {
    (window as any)?.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
    });
};
