import { notFound } from "next/navigation";

// Any address that matches no page ends here, so the visitor gets the 404 page in the language of the URL
// (src/app/[locale]/not-found.tsx) instead of the bare Next.js one.
export default function CatchAllPage() {
    notFound();
}
