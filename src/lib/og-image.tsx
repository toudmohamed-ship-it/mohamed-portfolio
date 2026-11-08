import { readFile } from "fs/promises";
import { join } from "path";
import { ImageResponse } from "next/og";
import en from "../../messages/en.json";
import fr from "../../messages/fr.json";

// Share images (Open Graph) generated at build time, one per page, so links on LinkedIn and elsewhere
// show the page's own title and result instead of the same site image. Site palette and Geist.
// Arabic pages use the English text: the bundled fonts are Latin only.
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type Messages = typeof en;
export const ogMessages = (locale: string): Messages => (locale === "fr" ? (fr as unknown as Messages) : en);

const LABELS: Record<string, Record<"case" | "service" | "guide", string>> = {
    en: { case: "Case study", service: "Service", guide: "Guide" },
    fr: { case: "Étude de cas", service: "Service", guide: "Guide" },
};
export const ogLabel = (locale: string, key: "case" | "service" | "guide") => (LABELS[locale] || LABELS.en)[key];

const font = (file: string) => readFile(join(process.cwd(), "src/assets/fonts", file));

export async function renderOgImage({ eyebrow, title, highlight, note }: { eyebrow: string; title: string; highlight?: string; note?: string }) {
    const [regular, semibold] = await Promise.all([font("Geist-Regular.ttf"), font("Geist-SemiBold.ttf")]);
    return new ImageResponse(
        (
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#F7F5F0", padding: "64px 72px", fontFamily: "Geist", color: "#1C2321" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>Mohamed Toudghi</div>
                    <div style={{ display: "flex", width: 84, height: 5, borderRadius: 3, background: "#2E6B57" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                    <div style={{ display: "flex", fontSize: 26, color: "#2E6B57", fontWeight: 600 }}>{eyebrow}</div>
                    <div style={{ display: "flex", fontSize: title.length > 60 ? 54 : 62, fontWeight: 600, lineHeight: 1.1, letterSpacing: -1.5, maxWidth: 1040 }}>{title}</div>
                    {highlight && (
                        <div style={{ display: "flex", alignSelf: "flex-start", background: "#E6EFEA", border: "2px solid #CFE0D6", borderRadius: 16, padding: "14px 24px", fontSize: 30, fontWeight: 600, color: "#1F4D3E", maxWidth: 1040 }}>{highlight}</div>
                    )}
                    {note && <div style={{ display: "flex", fontSize: 26, color: "#5A645F", maxWidth: 1000, lineHeight: 1.35 }}>{note}</div>}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#5A645F", borderTop: "2px solid #E2DDD3", paddingTop: 22 }}>
                    <div style={{ display: "flex" }}>mohamedtoudghi.com</div>
                    <div style={{ display: "flex" }}>SEO · Analytics · Digital marketing</div>
                </div>
            </div>
        ),
        {
            ...OG_SIZE,
            fonts: [
                { name: "Geist", data: regular, weight: 400, style: "normal" },
                { name: "Geist", data: semibold, weight: 600, style: "normal" },
            ],
        }
    );
}
