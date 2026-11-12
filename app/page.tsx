import type { Metadata } from "next";
import { Portfolio3D } from "@/components/desk/portfolio-3d";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function RootPage() {
  return <Portfolio3D />;
}
