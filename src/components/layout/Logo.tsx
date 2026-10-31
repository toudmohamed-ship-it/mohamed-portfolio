import clsx from "clsx";

// Wordmark: the name as real text with a short forest bar under its first letters ("position one").
// Sized by font-size; the bar ratios match D:\mohamedtoudghi-brand\logo\wordmark.svg. The Latin name stays LTR on /ar.
export default function Logo({ className }: { className?: string }) {
    return (
        <span dir="ltr" className={clsx("inline-flex flex-col shrink-0 font-semibold tracking-[-0.03em] text-ink", className)}>
            <span className="leading-none whitespace-nowrap">Mohamed Toudghi</span>
            <span aria-hidden="true" className="mt-[0.14em] ms-[0.06em] h-[0.13em] w-[2.06em] rounded-full bg-forest" />
        </span>
    );
}
