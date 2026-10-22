import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
    title: "Tasks",
    description: "Task manager",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en">
            <body style={{ margin: 0, fontFamily: "Arial, Helvetica, sans-serif", WebkitFontSmoothing: "antialiased" }}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
