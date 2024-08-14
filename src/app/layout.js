import {Inter} from "next/font/google";
import "./globals.css";
import ApolloClientProvider from "@/components/ApolloClientProvider";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "My Blog",
    description: "Come read my blog",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ApolloClientProvider>
            {children}
        </ApolloClientProvider>
        </body>
        </html>
    );
}
