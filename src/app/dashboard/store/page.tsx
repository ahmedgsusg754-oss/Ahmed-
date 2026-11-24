import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const storeSections = [
  {
    icon: "🪙",
    title: "العملات",
    description: "محفظة العملات وشحن الرصيد وتحويل العملات بين الأعضاء.",
    status: "قيد التجهيز",
  },
  {
    icon: "🎁",
    title: "الهدايا",
    description: "هدايا متنوعة لإرسالها إلى الأعضاء والتعبير عن الدعم.",
    status: "قيد التجهيز",
  },
  {
    icon: "🏅",
    title: "الشارات",
    description: "شارات مميزة تظهر بجانب اسمك وفي ملفك الشخصي.",
    status: "قيد التجهيز",
  },
  {
    icon: "👑",
    title: "الرتب المميزة",
    description: "رتب وامتيازات خاصة لأعضاء المنصة.",
    status: "قيد التجهيز",
  },
];

export default async function StorePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("username, display_name, role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !profile) {
    redirect("/dashboard");
  }

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #282014 0%, #101010 40%, #070707 100%)",
        color: "#f5f1e8",
        padding: "35px 18px 60px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <Link
          href="/dashboard"
          style={{
            color: "#d6b36a",
            textDecoration: "none",
            fontSize: 14,
          }}
        >
          ← العودة إلى لوحة الأعضاء
        </Link>

        <header style={{ marginTop: 35, marginBottom: 30 }}>
          <p
            style={{
              color: "#b99a5b",
              fontSize: 13,
              letterSpacing: 2,
              marginBottom: 8,
            }}
          >
            OZAMAA EXCLUSIVE STORE
          </p>

          <h1
            style={{
              color: "#e5c47d",
              fontSize: 30,
              margin: 0,
            }}
          >
            متجر العـظـماء👑
          </h1>

          <p
            style={{
              color: "#aaa",
              lineHeight: 1.9,
              marginTop: 12,
            }}
          >
            {profile.display_name || profile.username}، اكتشف
            المميزات والهدايا التي ستتوفر داخل المنصة.
          </p>
        </header>

        <section
          style={{
            padding: 22,
            borderRadius: 18,
            background: "rgba(214,179,106,0.08)",
            border: "1px solid rgba(214,179,106,0.3)",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 32 }}>🪙</span>

            <div>
              <h2
                style={{
                  color: "#e5c47d",
                  fontSize: 17,
                  margin: 0,
                }}
              >
                محفظتك
              </h2>

              <p
                style={{
                  color: "#aaa",
                  fontSize: 13,
                  margin: "5px 0 0",
                }}
              >
                نظام رصيد العملات لم يتم تفعيله بعد.
              </p>
            </div>
          </div>
        </section>

        <h2
          style={{
            color: "#e5c47d",
            fontSize: 21,
            marginBottom: 18,
          }}
        >
          أقسام المتجر
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {storeSections.map((section) => (
            <article
              key={section.title}
              style={{
                padding: 22,
                borderRadius: 18,
                background: "rgba(255,255,255,0.045)",
                border: "1px solid rgba(214,179,106,0.2)",
                minHeight: 180,
              }}
            >
              <div style={{ fontSize: 34, marginBottom: 15 }}>
                {section.icon}
              </div>

              <h3
                style={{
                  color: "#e5c47d",
                  fontSize: 18,
                  margin: "0 0 10px",
                }}
              >
                {section.title}
              </h3>

              <p
                style={{
                  color: "#aaa",
                  fontSize: 13,
                  lineHeight: 1.9,
                  margin: "0 0 18px",
                }}
              >
                {section.description}
              </p>

              <span
                style={{
                  display: "inline-block",
                  padding: "6px 12px",
                  borderRadius: 20,
                  background: "rgba(214,179,106,0.1)",
                  color: "#d6b36a",
                  fontSize: 12,
                }}
              >
                {section.status}
              </span>
            </article>
          ))}
        </div>

        <footer
          style={{
            marginTop: 35,
            padding: 18,
            textAlign: "center",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            color: "#777",
            fontSize: 12,
          }}
        >
          العـظـماء👑 — التميز له مكان
        </footer>
      </div>
    </main>
  );
                  }
