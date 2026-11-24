
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/");
  }

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        padding: "28px 16px 60px",
        color: "#f5f1e8",
        background:
          "radial-gradient(circle at top,#302719,#101010 48%,#070707)",
      }}
    >
      <div style={{ maxWidth: 850, margin: "0 auto" }}>
        <Link
          href="/dashboard"
          style={{
            color: "#d6b36a",
            textDecoration: "none",
            fontSize: 13,
          }}
        >
          ← العودة للرئيسية
        </Link>

        <header style={{ marginTop: 35, marginBottom: 25 }}>
          <p
            style={{
              color: "#b99a5b",
              fontSize: 12,
              letterSpacing: 2,
            }}
          >
            OZAMAA MESSAGES
          </p>

          <h1
            style={{
              color: "#e5c47d",
              fontSize: 28,
              margin: "8px 0",
            }}
          >
            الرسائل والمحادثات 💬
          </h1>

          <p style={{ color: "#999", lineHeight: 1.9 }}>
            تواصل مع أعضاء منصة العـظـماء.
          </p>
        </header>

        <section
          style={{
            padding: 25,
            borderRadius: 18,
            background: "linear-gradient(145deg,#1c1a16,#111)",
            border: "1px solid rgba(214,179,106,0.25)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "45px 15px",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 15 }}>
              💬
            </div>

            <h2
              style={{
                color: "#e5c47d",
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              مرحبًا بك في الرسائل
            </h2>

            <p
              style={{
                color: "#aaa",
                lineHeight: 2,
                fontSize: 14,
              }}
            >
              لم يتم تجهيز نظام المحادثات بعد.
              ستظهر محادثاتك هنا عند اكتمال نظام الرسائل.
            </p>
          </div>
        </section>

        <footer
          style={{
            textAlign: "center",
            color: "#777",
            fontSize: 12,
            marginTop: 30,
          }}
        >
          العـظـماء 👑 — الرسائل
        </footer>
      </div>
    </main>
  );
}
