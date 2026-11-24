import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function GroupsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
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

        <h1
          style={{
            color: "#d6b36a",
            fontSize: 27,
            marginTop: 30,
          }}
        >
          مجموعات العـظـماء👑
        </h1>

        <p style={{ color: "#999" }}>
          مرحبًا {profile.display_name || profile.username}
        </p>

        <section
          style={{
            marginTop: 25,
            padding: "45px 20px",
            textAlign: "center",
            borderRadius: 20,
            background: "#151515",
            border: "1px solid rgba(214,179,106,0.25)",
          }}
        >
          <div style={{ fontSize: 45, marginBottom: 15 }}>
            👥
          </div>

          <h2 style={{ color: "#e5c47d", fontSize: 20 }}>
            اكتشف المجموعات
          </h2>

          <p
            style={{
              color: "#999",
              lineHeight: 1.9,
              maxWidth: 430,
              margin: "12px auto 0",
            }}
          >
            نظام إنشاء المجموعات والانضمام إليها وإدارة الأعضاء
            قيد التجهيز. ستظهر المجموعات هنا بعد ربط قاعدة البيانات.
          </p>
        </section>
      </div>
    </main>
  );
                   }
