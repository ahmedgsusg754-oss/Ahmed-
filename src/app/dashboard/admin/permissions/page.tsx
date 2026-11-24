
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const permissionGroups = [
  {
    title: "إدارة الأعضاء",
    icon: "👥",
    permissions: [
      "عرض بيانات الأعضاء",
      "تعديل الملفات الشخصية",
      "تغيير رتب الأعضاء",
      "حظر الحسابات",
      "فك الحظر",
      "مراجعة البلاغات",
    ],
  },
  {
    title: "إدارة المحتوى",
    icon: "📰",
    permissions: [
      "إدارة المنشورات",
      "إدارة التعليقات",
      "إدارة القصص",
      "حذف المحتوى المخالف",
      "مراجعة البلاغات",
    ],
  },
  {
    title: "المجموعات والمحادثات",
    icon: "💬",
    permissions: [
      "إدارة المجموعات",
      "تعيين مشرفي المجموعات",
      "إدارة الغرف",
      "مراجعة المحادثات المبلغ عنها",
    ],
  },
  {
    title: "المتجر والمحفظة",
    icon: "🪙",
    permissions: [
      "عرض أرصدة العملات",
      "مراجعة التحويلات",
      "إدارة الهدايا",
      "إدارة الشارات",
      "إدارة منتجات المتجر",
    ],
  },
  {
    title: "الأمان",
    icon: "🛡️",
    permissions: [
      "مراجعة التنبيهات الأمنية",
      "إدارة الأجهزة المحظورة",
      "مراجعة بصمات المتصفحات",
      "عرض سجل الإجراءات",
    ],
  },
  {
    title: "إدارة المنصة",
    icon: "⚙️",
    permissions: [
      "إدارة الإشعارات",
      "إدارة إعدادات المظهر",
      "إدارة المستويات والمكافآت",
      "إدارة وضع الصيانة",
    ],
  },
];

const protectedPermissions = [
  "تغيير ملكية OWNER الأساسي",
  "تعديل صلاحيات OWNER الأساسي",
  "إلغاء ملكية OWNER الأساسي",
  "حذف حساب OWNER الأساسي",
];

export default async function PermissionsPage() {
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

        <header style={{ marginTop: 35, marginBottom: 25 }}>
          <p
            style={{
              color: "#b99a5b",
              fontSize: 12,
              letterSpacing: 2,
            }}
          >
            OZAMAA PERMISSIONS
          </p>

          <h1
            style={{
              color: "#e5c47d",
              fontSize: 28,
              margin: "8px 0",
            }}
          >
            إدارة الصلاحيات 🔐
          </h1>

          <p style={{ color: "#999", lineHeight: 1.9 }}>
            تنظيم صلاحيات فريق الإدارة وحماية ملكية المنصة.
          </p>
        </header>

        <section
          style={{
            padding: 22,
            borderRadius: 18,
            background: "rgba(214,179,106,0.09)",
            border: "1px solid rgba(214,179,106,0.35)",
            marginBottom: 25,
          }}
        >
          <div style={{ fontSize: 32 }}>👑</div>

          <h2 style={{ color: "#e5c47d", fontSize: 19 }}>
            {isOwner ? "المالك الأساسي OWNER" : "المالك الاحتياطي"}
          </h2>

          <p style={{ color: "#aaa", fontSize: 13, lineHeight: 1.9 }}>
            {isOwner
              ? "يمكنك اعتماد نظام الصلاحيات وتوزيع مهام الإدارة. التغييرات الحساسة يجب تسجيلها والتحقق منها."
              : "يمكنك إدارة المهام المسموح بها، ولا يمكنك تغيير ملكية أو صلاحيات المالك الأساسي."}
          </p>
        </section>

        <section
          style={{
            padding: 20,
            borderRadius: 18,
            background: "#171717",
            border: "1px solid rgba(214,179,106,0.25)",
            marginBottom: 25,
          }}
        >
          <h2 style={{ color: "#e5c47d", fontSize: 18 }}>
            الصلاحيات المحمية
          </h2>

          <p style={{ color: "#999", fontSize: 12, lineHeight: 1.9 }}>
            هذه العمليات لا يمكن تفويضها لأي مدير أو مشرف أو مالك احتياطي.
          </p>

          <div style={{ display: "grid", gap: 10 }}>
            {protectedPermissions.map((permission) => (
              <div
                key={permission}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: 12,
                  borderRadius: 12,
                  background: "rgba(180,60,60,0.08)",
                  border: "1px solid rgba(180,60,60,0.2)",
                }}
              >
                <span>🔒</span>
                <span style={{ color: "#e3b7a8", fontSize: 13 }}>
                  {permission}
                </span>
              </div>
            ))}
          </div>
        </section>

        {permissionGroups.map((group) => (
          <section
            key={group.title}
            style={{
              padding: 20,
              marginBottom: 16,
              borderRadius: 17,
              background: "linear-gradient(145deg,#1c1a16,#111)",
              border: "1px solid rgba(214,179,106,0.2)",
            }}
          >
            <h2
              style={{
                color: "#e5c47d",
                fontSize: 17,
                marginTop: 0,
              }}
            >
              {group.icon} {group.title}
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(min(100%,220px),1fr))",
                gap: 10,
              }}
            >
              {group.permissions.map((permission) => (
                <div
                  key={permission}
                  style={{
                    padding: 12,
                    borderRadius: 10,
                    background: "#24211b",
                    color: "#c9c1b1",
                    fontSize: 13,
                  }}
                >
                  <span style={{ color: "#d6b36a" }}>◆ </span>
                  {permission}
                </div>
              ))}
            </div>
          </section>
        ))}

        <section
          style={{
            padding: 20,
            borderRadius: 17,
            background: "#171717",
            border: "1px solid rgba(214,179,106,0.2)",
          }}
        >
          <h2 style={{ color: "#e5c47d", fontSize: 17 }}>
            قواعد توزيع الصلاحيات
          </h2>

          <ul
            style={{
              color: "#aaa",
              fontSize: 13,
              lineHeight: 2.2,
              paddingRight: 20,
            }}
          >
            <li>كل إداري يحصل على الصلاحيات اللازمة لمهمته فقط.</li>
            <li>يمكن سحب الصلاحيات الإدارية عند انتهاء المهمة.</li>
            <li>العمليات الحساسة تحتاج تحققًا إضافيًا.</li>
            <li>يتم تسجيل تغييرات الصلاحيات في سجل تدقيق محمي.</li>
            <li>لا يملك أي دور صلاحية تجاوز حماية OWNER الأساسي.</li>
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
          هذه واجهة عرض وتجهيز للصلاحيات.
          التعديل الفعلي وتوزيع الأدوار يحتاجان ربطًا آمنًا
          بقاعدة البيانات والخادم قبل تفعيل التحكم.
        </div>

        <footer
          style={{
            marginTop: 30,
            color: "#777",
            fontSize: 12,
            textAlign: "center",
          }}
        >
          العـظـماء 👑 — نظام إدارة الصلاحيات
        </footer>
      </div>
    </main>
  );
            }
