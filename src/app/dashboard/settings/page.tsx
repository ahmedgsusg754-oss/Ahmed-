import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/actions/logout";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, display_name, role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    redirect("/dashboard");
  }

  const roleNames: Record<string, string> = {
    OWNER: "المالك الأساسي",
    BACKUP_OWNER: "المالك الاحتياطي",
    MEMBER: "عضو",
  };

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
      <div style={{ maxWidth: 650, margin: "0 auto" }}>
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
            إعدادات الحساب
          </h1>

          <div
            style={{
              padding: 18,
              background: "#0c0c0c",
              borderRadius: 14,
              marginTop: 22,
              lineHeight: 2,
            }}
          >
            <p>
              الاسم: {profile.display_name || profile.username}
            </p>

            <p>
              اسم المستخدم: @{profile.username}
            </p>

            <p>
              الرتبة: {roleNames[profile.role] || "عضو"}
            </p>

            <p style={{ marginBottom: 0, color: "#aaa" }}>
              البريد الإلكتروني: {user.email || "غير متاح"}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gap: 14,
              marginTop: 25,
            }}
          >
            <Link
              href="/dashboard/profile"
              style={{
                display: "block",
                padding: 15,
                textAlign: "center",
                borderRadius: 12,
                background: "linear-gradient(135deg, #e5c47d, #a47b35)",
                color: "#17120a",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              تعديل الملف الشخصي
            </Link>

            <form action={logout}>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: 15,
                  borderRadius: 12,
                  border: "1px solid #704040",
                  background: "#241313",
                  color: "#efaaaa",
                  fontSize: 15,
                  cursor: "pointer",
                }}
              >
                تسجيل الخروج
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
