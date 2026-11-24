import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, username")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    redirect("/dashboard");
  }

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#080808",
        color: "#f5f1e8",
        padding: "35px 18px",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Link
          href="/dashboard"
          style={{
            color: "#d6b36a",
            textDecoration: "none",
          }}
        >
          ← العودة إلى لوحة الأعضاء
        </Link>

        <section
          style={{
            marginTop: 30,
            padding: 25,
            borderRadius: 20,
            background: "#151515",
            border: "1px solid rgba(214,179,106,0.3)",
          }}
        >
          <h1
            style={{
              color: "#d6b36a",
              fontSize: 26,
              marginTop: 0,
            }}
          >
            الإشعارات
          </h1>

          <p style={{ color: "#aaa" }}>
            مرحبًا {profile.display_name || profile.username}
          </p>

          <div
            style={{
              marginTop: 30,
              padding: "45px 15px",
              textAlign: "center",
              borderRadius: 15,
              background: "#0c0c0c",
              border: "1px solid #29251b",
            }}
          >
            <div style={{ fontSize: 38, marginBottom: 15 }}>
              🔔
            </div>

            <h2
              style={{
                color: "#e5c47d",
                fontSize: 19,
              }}
            >
              لا توجد إشعارات حاليًا
            </h2>

            <p
              style={{
                color: "#999",
                lineHeight: 1.8,
                fontSize: 14,
              }}
            >
              ستظهر هنا إشعارات التفاعلات والرسائل والتنبيهات
              عندما يتم ربط نظام الإشعارات بالمنصة.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
          }
