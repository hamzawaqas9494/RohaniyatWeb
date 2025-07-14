import "./globals.css";
export const metadata = {
  title: 'Idara Rohaniyat',
  icons: {
    icon:'web-icon.png'
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
