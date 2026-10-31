import clsx from "clsx";

// "MT" monogram with a small growth line. Decorative next to the visible name, so it is hidden from screen readers.
export default function Logo({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 34 34" aria-hidden="true" className={clsx("shrink-0", className)}>
            <rect width="34" height="34" rx="9" fill="#1C2321" />
            <path d="M8 23V11l5 7 5-7v12" fill="none" stroke="#F7F5F0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 21l3-4 2 2 3-5" fill="none" stroke="#7FC4A8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
