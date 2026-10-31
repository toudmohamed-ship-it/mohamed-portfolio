import { useTranslations } from "next-intl";

// White strip under the hero. Clients are described, never named (no permission to name them).
// The list drifts slowly; it is duplicated for a seamless loop.
export default function TrustStrip() {
    const t = useTranslations("HomePage.TrustStrip");
    const CLIENTS = t.raw("items") as string[];

    return (
        <section data-tone="white" className="bg-white border-y border-line">
            <div className="container-custom py-7 flex items-center gap-8">
                <h2 className="shrink-0 m-0 text-sm font-normal text-muted tracking-normal">{t("label")}</h2>
                <div className="flex-1 min-w-0 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
                    <ul className="marquee list-none m-0 p-0 gap-14">
                        {[...CLIENTS, ...CLIENTS].map((name, i) => (
                            <li
                                key={i}
                                aria-hidden={i >= CLIENTS.length ? true : undefined}
                                className="font-medium text-[17px] text-ink-soft whitespace-nowrap last:pe-14"
                            >
                                {name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
