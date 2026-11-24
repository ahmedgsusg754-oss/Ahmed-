
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateProfile } from "@/app/actions/profile";

export const dynamic = "force-dynamic";

const inputStyle = {
  display: "block",
  width: "100%",
  boxSizing: "border-box" as const,
  padding: 14,
  borderRadius: 11,
  border: "1px solid #51452f",
  background: "#101010",
  color: "#f5f1e8",
  fontSize: 14,
  outline: "none",
};

export default async function ProfilePage() {
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
    .select("username, display_name, bio, role, avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !profile) {
    redirect("/dashboard");
  }

  async function submitProfileUpdate(
    formData: FormData
  ): Promise<void> {
    "use server";
    await updateProfile(formData);
  }

  const roleLabel =
    profile.role === "OWNER"
      ? "المالك الأساسي OWNER 👑"
      : profile.role === "BACKUP_OWNER"
        ? "المالك الاحتياطي"
        : "عضو";

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
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
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
            OZAMAA PROFILE
          </p>

          <h1
            style={{
              color: "#e5c47d",
              fontSize: 28,
              margin: "8px 0",
            }}
          >
            الملف الشخصي 👤
          </h1>

          <p style={{ color: "#999", lineHeight: 1.9 }}>
            راجع بيانات حسابك وعدّل المعلومات الظاهرة للأعضاء.
          </p>
        </header>

        <section
          style={{
            padding: 24,
            borderRadius: 18,
            background: "linear-gradient(145deg,#1c1a16,#111)",
            border: "1px solid rgba(214,179,106,0.25)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 25,
            }}
          >
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                background: "#292319",
                border: "2px solid #d6b36a",
                color: "#e5c47d",
                fontSize: 28,
              }}
            >
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="الصورة الشخصية"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                "👑"
              )}
            </div>

            <div>
              <h2
                style={{
                  color: "#e5c47d",
                  fontSize: 19,
                  margin: "0 0 7px",
                }}
              >
                {profile.display_name || profile.username}
              </h2>

              <p
                style={{
                  color: "#999",
                  fontSize: 13,
                  margin: 0,
                }}
              >
                @{profile.username}
              </p>
            </div>
          </div>

          <div
            style={{
              padding: 14,
              borderRadius: 12,
              background: "#24211b",
              marginBottom: 20,
            }}
          >
            <p style={{ color: "#999", fontSize: 12 }}>
              رتبة الحساب
            </p>

            <strong style={{ color: "#e5c47d" }}>
              {roleLabel}
            </strong>
          </div>

          <form action={submitProfileUpdate}>
            <label
              htmlFor="display_name"
              style={{
                display: "block",
                color: "#e5c47d",
                fontSize: 14,
                marginBottom: 9,
              }}
            >
              الاسم الظاهر
            </label>

            <input
              id="display_name"
              name="display_name"
              type="text"
              required
              maxLength={40}
              defaultValue={profile.display_name || ""}
              placeholder="اكتب الاسم الذي يظهر للأعضاء"
              style={inputStyle}
            />

            <label
              htmlFor="bio"
              style={{
                display: "block",
                color: "#e5c47d",
                fontSize: 14,
                margin: "20px 0 9px",
              }}
            >
              النبذة الشخصية
            </label>

            <textarea
              id="bio"
              name="bio"
              maxLength={300}
              rows={5}
              defaultValue={profile.bio || ""}
              placeholder="اكتب نبذة مختصرة عن نفسك..."
              style={{
                ...inputStyle,
                resize: "vertical",
                minHeight: 120,
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                marginTop: 22,
                padding: 15,
                border: "none",
                borderRadius: 12,
                background:
                  "linear-gradient(135deg,#e5c47d,#a98239)",
                color: "#17120a",
                fontWeight: "bold",
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              حفظ التعديلات
            </button>
          </form>
        </section>

        <footer
          style={{
            textAlign: "center",
            color: "#777",
            fontSize: 12,
            marginTop: 30,
          }}
        >
          العـظـماء 👑 — الملف الشخصي
        </footer>
      </div>
    </main>
  );
        }
                
