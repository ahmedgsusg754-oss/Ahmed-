
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const auditCategories = [
  {
    icon: "👑",
    title: "إجراءات المالك الأساسي",
    description: "تغييرات إعدادات المنصة والقرارات الإدارية الحساسة.",
  },
  {
    icon: "🛡️",
    title: "إجراءات المالك الاحتياطي",
    description: "العمليات الإدارية المنفذة ضمن الصلاحيات المعتمدة.",
  },
  {
    icon: "👥",
    title: "إدارة الأعضاء",
    description: "تغييرات الرتب والحظر وفك الحظر وإدارة الحسابات.",
  },
  {
    icon: "💰",
    title: "العملات والتحويلات",
    description: "عمليات المحفظة والتحويلات ومراجعة الأرصدة.",
  },
  {
    icon: "⚙️",
    title: "إعدادات المنصة",
    description: "تغييرات التصميم والصلاحيات والإعدادات العامة.",
  },
  {
    icon: "🔐",
    title: "الأمان",
    description: "مراجعة إجراءات الحماية والأجهزة والجلسات.",
  },
];

export default async function AdminAuditPage() {
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
            OZAMAA ADMIN AUDIT
          </p>

          <h1
            style={{
              color: "#e5c47d",
              fontSize: 28,
              margin: "8px 0",
            }}
          >
            سجل العمليات الإدارية 📋
          </h1>

          <p style={{ color: "#999", lineHeight: 1.9 }}>
            متابعة وتوثيق الإجراءات الإدارية المهمة داخل المنصة.
          </p>
        </header>

        <section
          style={{
            padding: 20,
            borderRadius: 18,
            background: "rgba(214,179,106,0.08)",
            border: "1px solid rgba(214,179,106,0.3)",
            marginBottom: 24,
          }}
        >
          <div style={{ fontSize: 32 }}>🔎</div>

          <h2 style={{ color: "#e5c47d", fontSize: 18 }}>
            مركز المراجعة والتدقيق
          </h2>

          <p style={{ color: "#aaa", fontSize: 13, lineHeight: 2 }}>
            يجب توثيق العمليات الإدارية الحساسة مع تحديد منفذ
            العملية ووقتها ونوعها ونتيجتها، وحماية السجل من
            التعديل غير المصرح به.
          </p>
        </section>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(min(100%,280px),1fr))",
            gap: 15,
          }}
        >
          {auditCategories.map((category) => (
            <section
              key={category.title}
              style={{
                padding: 20,
                borderRadius: 17,
                background: "linear-gradient(145deg,#1c1a16,#111)",
                border: "1px solid rgba(214,179,106,0.2)",
              }}
            >
              <div style={{ fontSize: 30, marginBottom: 12 }}>
                {category.icon}
              </div>

              <h2
                style={{
                  color: "#e5c47d",
                  fontSize: 16,
                  margin: "0 0 10px",
                }}
              >
                {category.title}
              </h2>

              <p
                style={{
                  color: "#aaa",
                  fontSize: 13,
                  lineHeight: 1.9,
                }}
              >
                {category.description}
              </p>

              <div
                style={{
                  marginTop: 15,
                  padding: 10,
                  borderRadius: 9,
                  background: "#24211b",
                  color: "#b99a5b",
                  fontSize: 11,
                  textAlign: "center",
                }}
              >
                بانتظار ربط سجل قاعدة البيانات
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
            البيانات المطلوب تسجيلها
          </h2>

          <ul
            style={{
              color: "#aaa",
              fontSize: 13,
              lineHeight: 2.2,
              paddingRight: 20,
            }}
          >
            <li>معرف الحساب الذي نفذ العملية.</li>
            <li>الرتبة الإدارية وقت تنفيذ العملية.</li>
            <li>نوع الإجراء والقسم المتأثر به.</li>
            <li>وقت التنفيذ بالتاريخ والتوقيت.</li>
            <li>نتيجة العملية: ناجحة أو مرفوضة أو فاشلة.</li>
            <li>معرف الحساب المستهدف عند وجوده.</li>
            <li>سبب الإجراء عند الحاجة.</li>
          </ul>
        </section>

        <section
          style={{
            marginTop: 18,
            padding: 18,
            borderRadius: 15,
            background: "rgba(180,60,60,0.07)",
            border: "1px solid rgba(180,60,60,0.2)",
          }}
        >
          <h2 style={{ color: "#d9a69a", fontSize: 16 }}>
            حماية سجل التدقيق
          </h2>

          <p style={{ color: "#aaa", fontSize: 13, lineHeight: 2 }}>
            لا ينبغي السماح للمديرين أو المشرفين بتعديل السجلات
            أو حذفها. يجب تنفيذ التسجيل من الخادم، مع صلاحيات
            قراءة محددة وسجل محمي للعمليات الحساسة.
          </p>
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
          هذه واجهة تجهيز وليست سجلًا فعليًا بعد.
          لن تظهر عمليات حقيقية حتى ننشئ جدول التدقيق
          ونربطه بإجراءات الإدارة الآمنة.
        </div>

        <footer
          style={{
            marginTop: 30,
            color: "#777",
            fontSize: 12,
            textAlign: "center",
          }}
        >
          العـظـماء 👑 — سجل العمليات الإدارية
        </footer>
      </div>
    </main>
  );
}
