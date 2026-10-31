import { forwardRef } from "react";

// "Search horizon": three soft wave layers at the bottom of the hero.
// The flow is pure CSS (each layer is a seamless 2x-wide wave translated by -50%), so it costs no JavaScript
// and runs on the compositor. The hills are swells that the hero lifts toward the mouse on desktop only.

const W = 1440; // one period, in viewBox units
const H = 200;

export const LAYERS = [
    { base: 92, amp: 13, k1: 3, k2: 7, p: 0.0, lift: 30, fill: "#E3EDE7", duration: "46s", reverse: true },
    { base: 126, amp: 11, k1: 4, k2: 9, p: 1.7, lift: 40, fill: "#CFE0D6", duration: "34s", reverse: false },
    { base: 162, amp: 8, k1: 5, k2: 11, p: 3.1, lift: 20, fill: "#FFFFFF", duration: "26s", reverse: true },
];

// A wave that repeats exactly every W units (k1, k2 are whole numbers of cycles per period)
function wavePath({ base, amp, k1, k2, p }: (typeof LAYERS)[number]) {
    const y = (x: number) =>
        base + amp * Math.sin((2 * Math.PI * k1 * x) / W + p) + amp * 0.45 * Math.sin((2 * Math.PI * k2 * x) / W + p * 2);
    let d = `M0 ${y(0).toFixed(1)}`;
    for (let x = 20; x <= W * 2; x += 20) d += ` L${x} ${y(x).toFixed(1)}`;
    return `${d} L${W * 2} ${H} L0 ${H} Z`;
}

// Gaussian swell, 680 units wide, peak `lift` above the layer's base
const HILL_HALF = 340;
function hillPath({ base, lift }: (typeof LAYERS)[number]) {
    const sigma = 140;
    let d = `M${-HILL_HALF} ${H}`;
    for (let x = -HILL_HALF; x <= HILL_HALF; x += 20) d += ` L${x} ${(base - lift * Math.exp(-(x * x) / (2 * sigma * sigma))).toFixed(1)}`;
    return `${d} L${HILL_HALF} ${H} Z`;
}

const PATHS = LAYERS.map(wavePath);
const HILLS = LAYERS.map(hillPath);

type Props = { pinLabel: string };

// Refs: one wrapper div per hill, so the hero can move them with a transform only
const HeroWaves = forwardRef<(HTMLDivElement | null)[], Props>(function HeroWaves({ pinLabel }, ref) {
    const setHill = (i: number) => (el: HTMLDivElement | null) => {
        if (ref && typeof ref !== "function" && ref.current) ref.current[i] = el;
    };

    return (
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[200px] pointer-events-none overflow-hidden">
            {LAYERS.map((layer, i) => (
                <div key={i} className="contents">
                    <div
                        className="wave-flow absolute top-0 left-0 h-[200px] w-[200%]"
                        style={{ animationDuration: layer.duration, animationDirection: layer.reverse ? "reverse" : "normal" }}
                    >
                        <svg viewBox={`0 0 ${W * 2} ${H}`} preserveAspectRatio="none" className="block w-full h-full">
                            <path d={PATHS[i]} fill={layer.fill} />
                        </svg>
                    </div>
                    <div
                        ref={setHill(i)}
                        className="hill absolute top-0 left-0 h-[200px] w-[47.2222%]"
                        style={{ transform: `translate3d(-100%, ${layer.lift + layer.amp * 1.5}px, 0)` }}
                    >
                        <svg viewBox={`${-HILL_HALF} 0 ${HILL_HALF * 2} ${H}`} preserveAspectRatio="none" className="block w-full h-full">
                            <path d={HILLS[i]} fill={layer.fill} />
                        </svg>
                    </div>
                </div>
            ))}
            <div className="absolute left-[70%] top-[118px] flex flex-col items-center -translate-x-1/2 -translate-y-full">
                <span className="bob inline-flex items-center gap-1.5 bg-ink text-paper text-xs font-medium px-2.5 py-[5px] rounded-full whitespace-nowrap">
                    <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 1v8M2 4l3-3 3 3" fill="none" stroke="#7FC4A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {pinLabel}
                </span>
                <span className="w-[1.5px] h-3.5 bg-ink" />
                <span className="w-2.5 h-2.5 rounded-full bg-forest border-2 border-white shadow-[0_0_0_1px_#2E6B57]" />
            </div>
        </div>
    );
});

export default HeroWaves;
