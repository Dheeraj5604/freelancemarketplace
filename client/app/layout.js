// client/app/layout.js
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext"; // Use alias or adjust path

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
