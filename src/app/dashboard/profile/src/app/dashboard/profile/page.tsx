
import { updateProfile } from "@/app/actions/profile";

export const dynamic = "force-dynamic";

const inputStyle = {
  width: "100%",
  padding: "13px 15px",
  borderRadius: "12px",
  border: "1px solid #333",
  background: "#111",
  color: "#fff",
  outline: "none",
};

async function submitProfileUpdate(formData: FormData): Promise<void> {
  "use server";
  await updateProfile(formData);
}

export default async function ProfilePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "24px",
        background: "#080808",
        color: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
        }}
      >
        <header style={{ marginBottom: "30px" }}>
          <p
            style={{
              color: "#c9a34a",
              fontSize: "13px",
              letterSpacing: "3px",
              marginBottom: "8px",
            }}
          >
            AL OZAMAA
          </p>

          <h1
            style={{
              fontSize: "30px",
              fontWeight: 800,
              margin: 0,
            }}
          >
            الملف الشخصي
          </h1>

          <p style={{ color: "#999", marginTop: "10px" }}>
            إدارة بيانات حسابك ومعلوماتك الشخصية
          </p>
        </header>

        <section
          style={{
            background: "#111",
            border: "1px solid #292929",
            borderRadius: "20px",
            padding: "24px",
          }}
        >
          <h2
            style={{
              color: "#d6b45c",
              fontSize: "20px",
              marginTop: 0,
              marginBottom: "22px",
            }}
          >
            بيانات الحساب
          </h2>

          <form action={submitProfileUpdate}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "18px",
              }}
            >
              <label style={{ display: "grid", gap: "9px" }}>
                <span style={{ color: "#ccc" }}>اسم المستخدم</span>
                <input
                  name="username"
                  type="text"
                  placeholder="اسم المستخدم"
                  autoComplete="username"
                  style={inputStyle}
                />
              </label>

              <label style={{ display: "grid", gap: "9px" }}>
                <span style={{ color: "#ccc" }}>الاسم الظاهر</span>
                <input
                  name="displayName"
                  type="text"
                  placeholder="الاسم الذي يظهر للأعضاء"
                  style={inputStyle}
                />
              </label>

              <label style={{ display: "grid", gap: "9px" }}>
                <span style={{ color: "#ccc" }}>اللقب</span>
                <input
                  name="title"
                  type="text"
                  placeholder="لقبك داخل العـظـماء"
                  style={inputStyle}
                />
              </label>

              <label style={{ display: "grid", gap: "9px" }}>
                <span style={{ color: "#ccc" }}>البريد الإلكتروني</span>
                <input
                  name="email"
                  type="email"
                  placeholder="البريد الإلكتروني"
                  autoComplete="email"
                  style={inputStyle}
                />
              </label>

              <label style={{ display: "grid", gap: "9px" }}>
                <span style={{ color: "#ccc" }}>العمر</span>
                <input
                  name="age"
                  type="number"
                  min="13"
                  max="120"
                  placeholder="العمر"
                  style={inputStyle}
                />
              </label>

              <label style={{ display: "grid", gap: "9px" }}>
                <span style={{ color: "#ccc" }}>الطول</span>
                <input
                  name="height"
                  type="number"
                  min="1"
                  max="250"
                  placeholder="الطول بالسنتيمتر"
                  style={inputStyle}
                />
              </label>
            </div>

            <label
              style={{
                display: "grid",
                gap: "9px",
                marginTop: "20px",
              }}
            >
              <span style={{ color: "#ccc" }}>نبذة عنك</span>
              <textarea
                name="bio"
                rows={5}
                placeholder="اكتب نبذة مختصرة عنك..."
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  fontFamily: "inherit",
                }}
              />
            </label>

            <button
              type="submit"
              style={{
                width: "100%",
                marginTop: "24px",
                padding: "15px",
                border: "none",
                borderRadius: "13px",
                background: "linear-gradient(135deg, #f0d17b, #a77a25)",
                color: "#17110a",
                fontWeight: 800,
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              حفظ التعديلات
            </button>
          </form>
        </section>

        <p
          style={{
            textAlign: "center",
            color: "#777",
            fontSize: "12px",
            marginTop: "22px",
          }}
        >
          العـظـماء👑 — هويتك تميزك
        </p>
      </div>
    </main>
  );
                }
