import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("username, display_name, role, avatar_url, bio")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !profile) {
    return (
      <main
        dir="rtl"
        style={{
          minHeight: "100vh",
          background: "#080808",
          color: "#f5f5f5",
          display: "grid",
          placeItems: "center",
          padding: 20,
          textAlign: "center",
        }}
      >
        <div>
          <h1 style={{ color: "#d6b36a" }}>
            العـظـماء👑
          </h1>
          <p>تعذر تحميل بيانات حسابك حاليًا.</p>
          <p>تأكد من إعداد قاعدة البيانات ثم حاول مرة أخرى.</p>
        </div>
      </main>
    );
  }

  const roleNames: Record<string, string> = {
    OWNER: "المالك الأساسي",
    BACKUP_OWNER: "المالك الاحتياطي",
    MEMBER: "عضو",
  };

  const displayName = profile.display_name || profile.username;

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #242016 0%, #101010 38%, #070707 100%)",
        color: "#f5f1e8",
        padding: "35px 18px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 15,
            marginBottom: 35,
          }}
        >
          <h1
            style={{
              color: "#d6b36a",
              fontSize: 25,
              margin: 0,
            }}
          >
            العـظـماء👑
          </h1>

          <span style={{ color: "#aaa", fontSize: 13 }}>
            المساحة الشخصية
          </span>
        </header>

        <section
          style={{
            background: "rgba(255,255,255,0.045)",
            border: "1px solid rgba(214,179,106,0.3)",
            borderRadius: 22,
            padding: "30px 22px",
            textAlign: "center",
            boxShadow: "0 15px 50px rgba(0,0,0,0.3)",
          }}
        >
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="الصورة الشخصية"
              style={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #d6b36a",
              }}
            />
          ) : (
            <div
              style={{
                width: 90,
                height: 90,
                margin: "0 auto",
                borderRadius: "50%",
                background: "#29251b",
                border: "2px solid #d6b36a",
                display: "grid",
                placeItems: "center",
                color: "#d6b36a",
                fontSize: 35,
              }}
            >
              👑
            </div>
          )}

          <h2
            style={{
              color: "#e5c47d",
              fontSize: 25,
              margin: "18px 0 8px",
            }}
          >
            {displayName}
          </h2>

          <p style={{ color: "#aaa", margin: "0 0 16px" }}>
            @{profile.username}
          </p>

          <span
            style={{
              display: "inline-block",
              padding: "8px 20px",
              borderRadius: 30,
              background: "rgba(214,179,106,0.12)",
              border: "1px solid #a98a4f",
              color: "#e5c47d",
              fontSize: 14,
            }}
          >
            {roleNames[profile.role] || "عضو"}
          </span>

          {profile.bio && (
            <p
              style={{
                color: "#c7c1b5",
                lineHeight: 1.8,
                marginTop: 20,
              }}
            >
              {profile.bio}
            </p>
          )}
        </section>

        <section
          style={{
            marginTop: 25,
            padding: 22,
            borderRadius: 18,
            background: "rgba(255,255,255,0.035)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h3 style={{ color: "#d6b36a", marginTop: 0 }}>
            مرحبًا بك في العـظـماء
          </h3>

          <p style={{ color: "#aaa", lineHeight: 1.9, marginBottom: 0 }}>
            تم تسجيل دخولك بنجاح. ستظهر هنا خدمات المنصة ومميزاتها
            بعد تجهيزها.
          </p>
        </section>
      </div>
    </main>
  );
    }
