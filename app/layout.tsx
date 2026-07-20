import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "Công ty TNHH Pomes | Cải tiến, chế tạo máy và tự động hóa";
const description =
  "Công ty TNHH Pomes tư vấn giải pháp cải tiến, thiết kế, chế tạo máy móc, hệ thống tự động và cung cấp thiết bị công nghiệp cơ khí, điện, tự động, khí nén tại TP.HCM.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Giải pháp tự động hóa",
    "Thiết kế chế tạo máy",
    "Cải tiến máy móc",
    "Gia công cơ khí chính xác",
    "Quét 3D công nghiệp",
    "Thiết kế ngược",
    "Bảo trì máy móc",
    "Thiết bị công nghiệp",
    "Thiết bị khí nén",
    "Tự động hóa nhà máy",
    "Công ty cơ khí tại TP.HCM",
    "Giải pháp kỹ thuật tại TP.HCM",
  ],
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title,
    description,
    siteName: "Công ty TNHH Pomes",
    type: "website",
    images: [{ url: "/og.png", width: 1600, height: 900, alt: "Pomes engineering and automation solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07172b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
