
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const sections = [
  {
    title: "إدارة الأعضاء",
    icon: "👥",
    description: "الحسابات والملفات الشخصية والرتب والحظر.",
    href: "/dashboard/members",
    category: "الأعضاء",
  },
  {
    title: "الترتيب والمميزون",
    icon: "🏆",
    description: "اختيار المميزين وترتيب بقية الأعضاء بالتفاعل.",
    href: "/dashboard/leaderboard",
    category: "الأعضاء",
  },
  {
    title: "الأجهزة والبصمات",
    icon: "📱",
    description: "إدارة الأجهزة المحظورة وبصمات المتصفحات.",
    href: "/dashboard/admin/security",
    category: "الأمان",
  },
  {
    title: "الأمان وسجل الدخول",
    icon: "🛡️",
    description: "مراجعة محاولات الدخول والتنبيهات الأمنية.",
    href: "/dashboard/admin/security",
    category: "الأمان",
  },
  {
    title: "الإدارة والصلاحيات",
    icon: "🔐",
    description: "تعيين الإداريين وتحديد صلاحيات كل دور.",
    href: "/dashboard/admin/permissions",
    category: "الإدارة",
  },
  {
    title: "المحفظة والعملات",
    icon: "🪙",
    description: "الأرصدة والتحويلات وسجل المعاملات.",
    href: "/dashboard/wallet",
    category: "الماليات",
  },
  {
    title: "المتجر والهدايا",
    icon: "🎁",
    description: "المنتجات والشارات والهدايا وVIP.",
    href: "/dashboard/store",
    category: "الماليات",
  },
  {
    title: "المجموعات والغرف",
    icon: "💬",
    description: "إدارة المجموعات والمشرفين والعضويات.",
    href: "/dashboard/groups",
    category: "التواصل",
  },
  {
    title: "الرسائل والمحادثات",
    icon: "✉️",
    description: "إدارة المحادثات والبلاغات والإشراف.",
    href: "/dashboard/messages",
    category: "التواصل",
  },
  {
    title: "المنشورات والقصص",
    icon: "📰",
    description: "إدارة المحتوى والتعليقات والبلاغات.",
    href: "/dashboard/admin/content",
    category: "المحتوى",
  },
  {
    title: "المستويات والمكافآت",
    icon: "⭐",
    description: "الخبرة والمستويات والمكافآت اليومية.",
    href: "/dashboard/admin/rewards",
    category: "النظام",
  },
  {
    title: "الإشعارات والإعلانات",
    icon: "🔔",
    description: "إعلانات المنصة والتنبيهات الجماعية.",
    href: "/dashboard/notifications",
    category: "النظام",
  },
  {
    title: "التصميم والهوية",
    icon: "🎨",
    description: "الألوان والخلفيات والشعار والمظهر.",
    href: "/dashboard/admin/appearance",
    category: "النظام",
  },
  {
    title: "إعدادات المنصة",
    icon: "⚙️",
    description: "إعدادات الخدمات والصيانة والخصوصية.",
    href: "/dashboard/settings",
    category: "النظام",
  },
  {
    title: "سجل العمليات الإدارية",
    icon: "📋",
    description: "تتبع الإجراءات الإدارية والتغييرات الحساسة.",
    href: "/dashboard/admin/audit",
    category: "الأمان",
  },
];

const categories = [
  "الأعضاء",
  "الأمان",
  "الإدارة",
  "الماليات",
  "التواصل",
  "المحتوى",
  "النظام",
];

const cardStyle = {
  background: "linear-gradient(145deg,#1c1a16,#111111)",
  border: "1px solid rgba(214,179,106,0.2)",
  borderRadius: 17,
  padding: 19,
};

export default async function AdminPage() {
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
    .select("username,display_name,role")
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

  const { count: membersCount } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  const name = profile.display_name || profile.username;

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at top,#302719 0%,#111 45%,#070707 100%)",
        color: "#f5f1e8",
        padding: "25px 16px 60px",
      }}
    >
      <div style={{ maxWidth: 1150, margin: "0 auto" }}>
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 15,
            marginBottom: 30,
          }}
        >
          <div>
            <p
              style={{
                color: "#b99a5b",
                fontSize: 11,
                letterSpacing: 3,
                margin: "0 0 8px",
              }}
            >
              OZAMAA CONTROL CENTER
            </p>
            <h1
              style={{
                color: "#e5c47d",
                fontSize: 27,
                margin: 0,
              }}
            >
              العـظـماء 👑
            </h1>
          </div>

          <Link
            href="/dashboard"
            style={{
              color: "#e5c47d",
              textDecoration: "none",
              border: "1px solid #80683d",
              borderRadius: 30,
              padding: "10px 17px",
              fontSize: 13,
            }}
          >
            لوحة الأعضاء ←
          </Link>
        </header>

        <section
          style={{
            ...cardStyle,
            padding: "27px 22px",
            marginBottom: 22,
            borderColor: "rgba(214,179,106,0.45)",
            background:
              "linear-gradient(120deg,#302719,#17130d 65%,#101010)",
          }}
        >
          <div style={{ fontSize: 38, marginBottom: 10 }}>
            👑
          </div>

          <p style={{ color: "#b99a5b", fontSize: 12 }}>
            مرحبًا بك في مركز التحكم
          </p>

          <h2
            style={{
              color: "#f0d28d",
              fontSize: 23,
              margin: "5px 0 12px",
            }}
          >
            {name}
          </h2>

          <span
            style={{
              display: "inline-block",
              color: "#e5c47d",
              background: "rgba(214,179,106,0.12)",
              border: "1px solid rgba(214,179,106,0.35)",
              borderRadius: 30,
              padding: "7px 14px",
              fontSize: 12,
            }}
          >
            {isOwner ? "المالك الأساسي OWNER" : "المالك الاحتياطي BACKUP OWNER"}
          </span>

          <p
            style={{
              color: "#aaa",
              lineHeight: 1.9,
              fontSize: 13,
              marginBottom: 0,
            }}
          >
            {isOwner
              ? "مركز إدارة المنصة والتحكم في إعداداتها وأقسامها وصلاحياتها."
              : "مركز الإدارة بصلاحيات المالك الاحتياطي، مع حماية ملكية وصلاحيات OWNER الأساسي."}
          </p>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(145px,1fr))",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div style={cardStyle}>
            <p style={{ color: "#aaa", fontSize: 12 }}>
              إجمالي الأعضاء
            </p>
            <h2
              style={{
                color: "#e5c47d",
                fontSize: 28,
                margin: 0,
              }}
            >
              {membersCount ?? "—"}
            </h2>
          </div>

          <div style={cardStyle}>
            <p style={{ color: "#aaa", fontSize: 12 }}>
              حالة المنصة
            </p>
            <h2 style={{ color: "#e5c47d", fontSize: 19 }}>
              متصلة
            </h2>
          </div>

          <div style={cardStyle}>
            <p style={{ color: "#aaa", fontSize: 12 }}>
              مستوى الإدارة
            </p>
            <h2 style={{ color: "#e5c47d", fontSize: 19 }}>
              {isOwner ? "كامل" : "احتياطي"}
            </h2>
          </div>
        </section>

        <div style={{ marginBottom: 25 }}>
          <h2
            style={{
              color: "#e5c47d",
              fontSize: 21,
              marginBottom: 7,
            }}
          >
            جميع أقسام التحكم
          </h2>
          <p
            style={{
              color: "#888",
              fontSize: 13,
              margin: 0,
            }}
          >
            اختر القسم الذي تريد إدارته.
          </p>
        </div>

        {categories.map((category) => {
          const items = sections.filter(
            (section) => section.category === category
          );

          return (
            <section key={category} style={{ marginBottom: 30 }}>
              <h3
                style={{
                  color: "#c9a45e",
                  fontSize: 16,
                  marginBottom: 13,
                }}
              >
                {category}
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(min(100%,240px),1fr))",
                  gap: 13,
                }}
              >
                {items.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    style={{
                      ...cardStyle,
                      textDecoration: "none",
                      color: "inherit",
                      display: "block",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 29,
                        marginBottom: 12,
                      }}
                    >
                      {item.icon}
                    </div>

                    <h4
                      style={{
                        color: "#e5c47d",
                        fontSize: 16,
                        margin: "0 0 9px",
                      }}
                    >
                      {item.title}
                    </h4>

                    <p
                      style={{
                        color: "#999",
                        fontSize: 12,
                        lineHeight: 1.9,
                        margin: 0,
                      }}
                    >
                      {item.description}
                    </p>

                    <div
                      style={{
                        color: "#b99a5b",
                        fontSize: 12,
                        marginTop: 15,
                      }}
                    >
                      فتح القسم ←
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <footer
          style={{
            borderTop: "1px solid rgba(214,179,106,0.18)",
            paddingTop: 20,
            textAlign: "center",
            color: "#777",
            fontSize: 12,
          }}
        >
          العـظـماء 👑 — مركز التحكم والإدارة
        </footer>
      </div>
    </main>
  );
  }
