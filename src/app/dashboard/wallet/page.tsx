import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function WalletPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, display_name")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    redirect("/dashboard");
  }

  const sections = [
    {
      icon: "🪙",
      title: "رصيد العملات",
      description: "سيظهر رصيدك الحالي بعد تفعيل نظام العملات.",
    },
    {
      icon: "↗️",
      title: "إرسال العملات",
      description: "تحويل العملات إلى أعضاء المنصة بعد تفعيل التحويل الآمن.",
    },
    {
      icon: "📋",
      title: "سجل العمليات",
      description: "متابعة عمليات الإرسال والاستلام والشحن.",
    },
  ];

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #282014, #101010 45%, #070707)",
        color: "#f5f1e8",
        padding: "35px 18px 60px",
      }}
    >
      <div style={{ maxWidth: 850, margin: "0 auto" }}>
        <Link
          href="/dashboard"
          style={{
            color: "#d6b36a",
            textDecoration: "none",
          }}
        >
          ← العودة إلى لوحة الأعضاء
        </Link>

        <header style={{ marginTop: 35 }}>
          <p style={{ color: "#b99a5b", fontSize: 13 }}>
            OZAMAA DIGITAL WALLET
          </p>

          <h1
            style={{
              color: "#e5c47d",
              fontSize: 29,
              margin: "8px 0",
            }}
          >
            محفظتي 🪙
          </h1>

          <p style={{ color: "#aaa", lineHeight: 1.8 }}>
            مرحبًا {profile.display_name || profile.username}
          </p>
        </header>

        <section
          style={{
            marginTop: 25,
            padding: 28,
            borderRadius: 20,
            background:
              "linear-gradient(135deg, #302719, #17130d)",
            border: "1px solid rgba(214,179,106,0.4)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 38 }}>👑</div>

          <p style={{ color: "#c5ad7b", marginBottom: 8 }}>
            رصيد العملات
          </p>

          <h2
            style={{
              color: "#e5c47d",
              fontSize: 32,
              margin: 0,
            }}
          >
            غير متاح حاليًا
          </h2>

          <p
            style={{
              color: "#999",
              fontSize: 13,
              marginTop: 12,
            }}
          >
            لم يتم تفعيل نظام المحفظة بعد.
          </p>
        </section>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 15,
            marginTop: 25,
          }}
        >
          {sections.map((section) => (
            <article
              key={section.title}
              style={{
                padding: 22,
                borderRadius: 17,
                background: "#151515",
                border: "1px solid rgba(214,179,106,0.2)",
              }}
            >
              <div style={{ fontSize: 30 }}>
                {section.icon}
              </div>

              <h3
                style={{
                  color: "#e5c47d",
                  fontSize: 17,
                }}
              >
                {section.title}
              </h3>

              <p
                style={{
                  color: "#aaa",
                  fontSize: 13,
                  lineHeight: 1.9,
                }}
              >
                {section.description}
              </p>

              <span
                style={{
                  display: "inline-block",
                  color: "#d6b36a",
                  background: "rgba(214,179,106,0.1)",
                  padding: "6px 12px",
                  borderRadius: 20,
                  fontSize: 12,
                }}
              >
                قيد التجهيز
              </span>
            </article>
          ))}
        </div>

        <footer
          style={{
            marginTop: 35,
            paddingTop: 18,
            borderTop: "1px solid #29251b",
            color: "#777",
            textAlign: "center",
            fontSize: 12,
          }}
        >
          العـظـماء👑 — محفظتك الرقمية
        </footer>
      </div>
    </main>
  );
            }
