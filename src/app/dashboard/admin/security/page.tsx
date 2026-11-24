
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const securitySections = [
  {
    icon: "📱",
    title: "حظر الأجهزة",
    description: "إدارة الأجهزة التي تم منعها من الوصول للمنصة.",
    status: "قيد ربط قاعدة البيانات",
  },
  {
    icon: "🔍",
    title: "بصمات المتصفحات",
    description: "مراجعة معرّفات المتصفحات المرتبطة بحالات إساءة الاستخدام.",
    status: "قيد التجهيز",
  },
  {
    icon: "🚫",
    title: "حظر الحسابات",
    description: "إدارة قرارات الحظر وأسبابها ومدتها.",
    status: "قيد ربط قاعدة البيانات",
  },
  {
    icon: "🔓",
    title: "طلبات فك الحظر",
    description: "مراجعة الاعتراضات وطلبات إعادة تفعيل الحسابات.",
    status: "قيد التجهيز",
  },
  {
    icon: "🔐",
    title: "جلسات الدخول",
    description: "متابعة الجلسات النشطة وإجراءات تسجيل الخروج.",
    status: "قيد التجهيز",
  },
  {
    icon: "⚠️",
    title: "التنبيهات الأمنية",
    description: "مراجعة الأنشطة غير المعتادة ومحاولات الوصول.",
    status: "قيد التجهيز",
  },
  {
    icon: "📋",
    title: "سجل الإجراءات",
    description: "تسجيل من نفذ الحظر أو فك الحظر ووقت التنفيذ.",
    status: "قيد التجهيز",
  },
  {
    icon: "🛡️",
    title: "سياسات الحماية",
    description: "إعداد قواعد الدخول والتحقق والحماية.",
    status: "قيد التجهيز",
  },
];

export default async function SecurityPage() {
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
    .select("username, display_name, role")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !profile) {
    redirect("/dashboard");
  }

  const isOwner = profile.role === "OWNER";
  const isBackup = profile.role === "BACKUP_OWNER";

  if (!isOwner && !isBackup) {
    redirect("/dashboard");
  }

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        padding: "28px 16px 60px",
        background:
          "radial-gradient(circle at top,#302719,#101010 48%,#070707)",
        color: "#f5f1e8",
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

        <header style={{ marginTop: 35, marginBottom: 25 }}>
          <p
            style={{
              color: "#b99a5b",
              fontSize: 12,
              letterSpacing: 2,
            }}
          >
            OZAMAA SECURITY CENTER
          </p>

          <h1
            style={{
              color: "#e5c47d",
              fontSize: 28,
              margin: "8px 0",
            }}
          >
            مركز الأمان والحماية 🛡️
          </h1>

          <p style={{ color: "#999", lineHeight: 1.9 }}>
            إدارة أمن الحسابات والأجهزة ومراجعة الإجراءات الأمنية.
          </p>
        </header>

        <section
          style={{
            padding: 22,
            borderRadius: 19,
            background: "rgba(214,179,106,0.08)",
            border: "1px solid rgba(214,179,106,0.3)",
            marginBottom: 25,
          }}
        >
          <div style={{ fontSize: 35 }}>🔐</div>

          <h2
            style={{
              color: "#e5c47d",
              fontSize: 19,
              margin: "10px 0",
            }}
          >
            {isOwner ? "المالك الأساسي OWNER" : "المالك الاحتياطي"}
          </h2>

          <p
            style={{
              color: "#aaa",
              fontSize: 13,
              lineHeight: 1.9,
              margin: 0,
            }}
          >
            {isOwner
              ? "يمكنك إدارة سياسات الأمان والإشراف على إجراءات الحظر وفك الحظر بعد ربط وظائف النظام."
              : "يمكنك استخدام صلاحيات الأمان الممنوحة لك، مع عدم إمكانية تغيير ملكية أو صلاحيات المالك الأساسي."}
          </p>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(min(100%,240px),1fr))",
            gap: 14,
          }}
        >
          {securitySections.map((section) => (
            <article
              key={section.title}
              style={{
                background:
                  "linear-gradient(145deg,#1c1a16,#111)",
                border: "1px solid rgba(214,179,106,0.2)",
                borderRadius: 17,
                padding: 20,
              }}
            >
              <div style={{ fontSize: 30, marginBottom: 12 }}>
                {section.icon}
              </div>

              <h3
                style={{
                  color: "#e5c47d",
                  fontSize: 16,
                  margin: "0 0 10px",
                }}
              >
                {section.title}
              </h3>

              <p
                style={{
                  color: "#999",
                  fontSize: 12,
                  lineHeight: 1.9,
                  minHeight: 48,
                }}
              >
                {section.description}
              </p>

              <span
                style={{
                  display: "inline-block",
                  padding: "7px 11px",
                  borderRadius: 20,
                  color: "#d6b36a",
                  background: "rgba(214,179,106,0.1)",
                  border: "1px solid rgba(214,179,106,0.2)",
                  fontSize: 11,
                }}
              >
                {section.status}
              </span>
            </article>
          ))}
        </section>

        <section
          style={{
            marginTop: 25,
            padding: 20,
            borderRadius: 17,
            background: "#171717",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h3 style={{ color: "#e5c47d", fontSize: 16 }}>
            ملاحظات الحماية
          </h3>

          <ul
            style={{
              color: "#aaa",
              fontSize: 13,
              lineHeight: 2.2,
              paddingRight: 20,
            }}
          >
            <li>
              لا تعتمد حماية الحساب على بصمة المتصفح وحدها.
            </li>
            <li>
              يجب تسجيل سبب الحظر والجهة التي نفذته.
            </li>
            <li>
              يجب توفير مراجعة واعتراض على قرارات الحظر.
            </li>
            <li>
              لا يجوز للإداريين تعديل ملكية OWNER الأساسي.
            </li>
            <li>
              تُحمى سجلات الإجراءات الحساسة من التعديل غير المصرح به.
            </li>
          </ul>
        </section>

        <footer
          style={{
            marginTop: 30,
            paddingTop: 18,
            borderTop: "1px solid rgba(214,179,106,0.15)",
            color: "#777",
            fontSize: 12,
            textAlign: "center",
          }}
        >
          العـظـماء 👑 — نظام الحماية والأمان
        </footer>
      </div>
    </main>
  );
            }
