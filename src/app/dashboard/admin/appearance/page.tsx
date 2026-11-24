
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const designSections = [
  {
    icon: "🎨",
    title: "ألوان المنصة",
    description: "إعداد الألوان الأساسية والذهبية والخلفيات.",
    options: ["الأسود الفاخر", "الذهبي الملكي", "ألوان النصوص", "ألوان الأزرار"],
  },
  {
    icon: "🌌",
    title: "الخلفيات",
    description: "إدارة خلفيات صفحات الدخول والرئيسية والملفات الشخصية.",
    options: ["خلفية تسجيل الدخول", "خلفية الرئيسية", "خلفيات المحادثات", "خلفيات المجموعات"],
  },
  {
    icon: "👑",
    title: "الشعار والهوية",
    description: "التحكم في شعار المنصة واسمها والعناصر البصرية.",
    options: ["شعار العـظـماء", "اسم المنصة", "رمز التاج", "علامة الملكية"],
  },
  {
    icon: "✨",
    title: "الإطارات والمؤثرات",
    description: "إعداد إطارات الحسابات والتأثيرات البصرية.",
    options: ["إطار OWNER الذهبي", "إطارات VIP", "إطارات الأعضاء", "تأثيرات الظهور"],
  },
  {
    icon: "🏅",
    title: "الشارات والأوسمة",
    description: "إدارة شكل الشارات والأوسمة ومستويات تميز الأعضاء.",
    options: ["شارات العضوية", "شارات الدعم", "شارات VIP", "الأوسمة الخاصة"],
  },
  {
    icon: "📱",
    title: "تجربة الاستخدام",
    description: "تنظيم شكل المنصة على الهواتف والأجهزة الكبيرة.",
    options: ["تصميم الهاتف", "تصميم الكمبيوتر", "أحجام الخطوط", "المسافات والعناصر"],
  },
];

export default async function AdminAppearancePage() {
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
    .select("display_name, role")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !profile) {
    redirect("/dashboard");
  }

  if (
    profile.role !== "OWNER" &&
    profile.role !== "BACKUP_OWNER"
  ) {
    redirect("/dashboard");
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
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Link
          href="/dashboard/admin"
          style={{
            color: "#d6b36a",
            textDecoration: "none",
            fontSize: 13,
          }}
        >
          ← العودة إلى مركز التحكم
        </Link>

        <header style={{ marginTop: 35, marginBottom: 28 }}>
          <p
            style={{
              color: "#b99a5b",
              fontSize: 12,
              letterSpacing: 2,
            }}
          >
            OZAMAA VISUAL IDENTITY
          </p>

          <h1
            style={{
              color: "#e5c47d",
              fontSize: 28,
              margin: "8px 0",
            }}
          >
            المظهر والهوية ✨
          </h1>

          <p style={{ color: "#999", lineHeight: 1.9 }}>
            مركز إدارة الشكل العام والهوية البصرية لمنصة العـظـماء.
          </p>
        </header>

        <section
          style={{
            padding: 22,
            borderRadius: 18,
            background: "rgba(214,179,106,0.08)",
            border: "1px solid rgba(214,179,106,0.3)",
            marginBottom: 25,
          }}
        >
          <div style={{ fontSize: 35 }}>👑</div>

          <h2 style={{ color: "#e5c47d", fontSize: 19 }}>
            هوية العـظـماء
          </h2>

          <p style={{ color: "#aaa", fontSize: 13, lineHeight: 2 }}>
            الهوية الأساسية المعتمدة: الأسود الفاخر والذهبي الملكي،
            مع تصميم هادئ ومتناسق يعمل على الهاتف والكمبيوتر.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 16,
            }}
          >
            <div
              style={{
                width: 95,
                height: 48,
                borderRadius: 10,
                background: "#101010",
                border: "1px solid #444",
              }}
            />
            <div
              style={{
                width: 95,
                height: 48,
                borderRadius: 10,
                background: "#d6b36a",
              }}
            />
            <div
              style={{
                width: 95,
                height: 48,
                borderRadius: 10,
                background: "#24211b",
                border: "1px solid #59482b",
              }}
            />
          </div>
        </section>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(min(100%,280px),1fr))",
            gap: 15,
          }}
        >
          {designSections.map((section) => (
            <section
              key={section.title}
              style={{
                padding: 20,
                borderRadius: 17,
                background: "linear-gradient(145deg,#1c1a16,#111)",
                border: "1px solid rgba(214,179,106,0.2)",
              }}
            >
              <div style={{ fontSize: 30, marginBottom: 12 }}>
                {section.icon}
              </div>

              <h2
                style={{
                  color: "#e5c47d",
                  fontSize: 17,
                  margin: "0 0 10px",
                }}
              >
                {section.title}
              </h2>

              <p
                style={{
                  color: "#aaa",
                  fontSize: 13,
                  lineHeight: 1.9,
                }}
              >
                {section.description}
              </p>

              <div style={{ display: "grid", gap: 8, marginTop: 15 }}>
                {section.options.map((option) => (
                  <div
                    key={option}
                    style={{
                      padding: 10,
                      borderRadius: 9,
                      background: "#24211b",
                      color: "#c9c1b1",
                      fontSize: 12,
                    }}
                  >
                    <span style={{ color: "#d6b36a" }}>◆ </span>
                    {option}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section
          style={{
            marginTop: 24,
            padding: 20,
            borderRadius: 17,
            background: "#171717",
            border: "1px solid rgba(214,179,106,0.2)",
          }}
        >
          <h2 style={{ color: "#e5c47d", fontSize: 17 }}>
            قواعد التحكم في الهوية
          </h2>

          <ul
            style={{
              color: "#aaa",
              fontSize: 13,
              lineHeight: 2.2,
              paddingRight: 20,
            }}
          >
            <li>المالك الأساسي هو صاحب القرار النهائي في هوية المنصة.</li>
            <li>تغييرات الهوية العامة يجب أن تكون قابلة للمراجعة.</li>
            <li>يجب الحفاظ على تناسق التصميم بين الهاتف والكمبيوتر.</li>
            <li>لا تتغير هوية OWNER المميزة دون موافقته.</li>
            <li>تُحفظ إعدادات التصميم قبل نشرها على جميع الأعضاء.</li>
          </ul>
        </section>

        <div
          style={{
            marginTop: 25,
            padding: 15,
            borderRadius: 13,
            background: "rgba(214,179,106,0.07)",
            color: "#b99a5b",
            fontSize: 12,
            lineHeight: 1.9,
            textAlign: "center",
          }}
        >
          هذه واجهة تجهيز لإدارة المظهر.
          حفظ الألوان والخلفيات والشعارات وتطبيقها على المنصة
          يحتاج إلى ربط إعدادات التصميم بقاعدة البيانات.
        </div>

        <footer
          style={{
            marginTop: 30,
            color: "#777",
            fontSize: 12,
            textAlign: "center",
          }}
        >
          العـظـماء 👑 — الهوية البصرية
        </footer>
      </div>
    </main>
  );
            }
