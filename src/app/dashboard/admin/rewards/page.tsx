
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const sections = [
  {
    icon: "📝",
    title: "المنشورات",
    description: "مراجعة منشورات الأعضاء وإدارة المحتوى المنشور.",
    status: "بانتظار ربط قاعدة البيانات",
  },
  {
    icon: "💬",
    title: "التعليقات",
    description: "مراجعة التعليقات والتعامل مع التعليقات المخالفة.",
    status: "بانتظار ربط قاعدة البيانات",
  },
  {
    icon: "📸",
    title: "القصص",
    description: "إدارة القصص المنشورة ومراجعة المحتوى المبلغ عنه.",
    status: "بانتظار ربط قاعدة البيانات",
  },
  {
    icon: "🎥",
    title: "الصور والفيديوهات",
    description: "مراجعة الوسائط المنشورة وإدارة المحتوى المخالف.",
    status: "بانتظار ربط قاعدة البيانات",
  },
  {
    icon: "🚨",
    title: "البلاغات",
    description: "متابعة بلاغات الأعضاء ومراجعة أسباب الإبلاغ.",
    status: "بانتظار ربط قاعدة البيانات",
  },
  {
    icon: "📌",
    title: "المحتوى المثبت",
    description: "تجهيز إدارة المنشورات المهمة والمثبتة.",
    status: "بانتظار ربط قاعدة البيانات",
  },
];

export default async function AdminContentPage() {
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
            OZAMAA CONTENT CONTROL
          </p>

          <h1
            style={{
              color: "#e5c47d",
              fontSize: 28,
              margin: "8px 0",
            }}
          >
            إدارة المحتوى 📰
          </h1>

          <p style={{ color: "#999", lineHeight: 1.9 }}>
            إدارة محتوى منصة العـظـماء ومراجعة المنشورات
            والقصص والبلاغات من مكان واحد.
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
          <h2
            style={{
              color: "#e5c47d",
              fontSize: 18,
              marginTop: 0,
            }}
          >
            صلاحيات إدارة المحتوى
          </h2>

          <p
            style={{
              color: "#aaa",
              fontSize: 13,
              lineHeight: 2,
              marginBottom: 0,
            }}
          >
            يمكن للمالك الأساسي إدارة جميع أقسام المحتوى.
            وتخضع صلاحيات المالك الاحتياطي والمديرين
            والمشرفين للحدود التي يعتمدها OWNER الأساسي.
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
          {sections.map((section) => (
            <section
              key={section.title}
              style={{
                padding: 20,
                borderRadius: 17,
                background:
                  "linear-gradient(145deg,#1c1a16,#111)",
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
                  minHeight: 50,
                }}
              >
                {section.description}
              </p>

              <div
                style={{
                  marginTop: 15,
                  padding: 10,
                  borderRadius: 10,
                  background: "#24211b",
                  color: "#b99a5b",
                  fontSize: 11,
                  textAlign: "center",
                }}
              >
                {section.status}
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
            قواعد حماية المحتوى
          </h2>

          <ul
            style={{
              color: "#aaa",
              fontSize: 13,
              lineHeight: 2.2,
              paddingRight: 20,
            }}
          >
            <li>تسجيل الإجراءات الإدارية المهمة.</li>
            <li>عدم حذف المحتوى دون التحقق من الصلاحية.</li>
            <li>إتاحة مراجعة البلاغات قبل اتخاذ الإجراء.</li>
            <li>حماية بيانات الأعضاء وخصوصية محادثاتهم.</li>
            <li>تطبيق قرارات الإدارة من الخادم وليس الواجهة فقط.</li>
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
          هذه واجهة تجهيز أولية.
          أدوات الحذف والمراجعة والتثبيت والبلاغات
          لن تصبح فعالة إلا بعد إنشاء جداول المحتوى
          وربطها بإجراءات آمنة على الخادم.
        </div>

        <footer
          style={{
            marginTop: 30,
            color: "#777",
            fontSize: 12,
            textAlign: "center",
          }}
        >
          العـظـماء 👑 — مركز إدارة المحتوى
        </footer>
      </div>
    </main>
  );
    }
            
