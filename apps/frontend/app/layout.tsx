import type { Metadata } from "next";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: "Tasks",
    description: "Task manager",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en">
            <body style={{ margin: 0, fontFamily: "Arial, Helvetica, sans-serif", WebkitFontSmoothing: "antialiased" }}>
                <Providers>{children}</Providers>
                <Toaster />
            </body>
        </html>
    );
}
