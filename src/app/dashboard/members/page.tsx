import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function MembersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, role, avatar_url")
    .order("created_at", { ascending: false })
    .limit(100);

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
      <div style={{ maxWidth: 850, margin: "0 auto" }}>
        <Link
          href="/dashboard"
          style={{
            color: "#d6b36a",
            textDecoration: "none",
          }}
        >
          ← العودة إلى لوحة الأعضاء
        </Link>

        <h1
          style={{
            color: "#d6b36a",
            fontSize: 27,
            marginTop: 30,
          }}
        >
          أعضاء العـظـماء👑
        </h1>

        <p style={{ color: "#999", marginBottom: 25 }}>
          قائمة الأعضاء المسجلين في المنصة
        </p>

        {error ? (
          <section
            style={{
              padding: 22,
              borderRadius: 15,
              background: "#241313",
              border: "1px solid #704040",
              color: "#efaaaa",
            }}
          >
            تعذر تحميل قائمة الأعضاء. تأكد من إعداد قاعدة البيانات.
          </section>
        ) : !profiles || profiles.length === 0 ? (
          <section
            style={{
              padding: 35,
              textAlign: "center",
              borderRadius: 18,
              background: "#151515",
              border: "1px solid #29251b",
            }}
          >
            <div style={{ fontSize: 35 }}>👑</div>
            <h2 style={{ color: "#e5c47d" }}>
              لا يوجد أعضاء حتى الآن
            </h2>
            <p style={{ color: "#999" }}>
              سيظهر الأعضاء هنا بعد إنشاء حساباتهم.
            </p>
          </section>
        ) : (
          <div style={{ display: "grid", gap: 14 }}>
            {profiles.map((member) => (
              <article
                key={member.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 15,
                  padding: 17,
                  borderRadius: 15,
                  background: "#151515",
                  border: "1px solid rgba(214,179,106,0.2)",
                }}
              >
                {member.avatar_url ? (
                  <img
                    src={member.avatar_url}
                    alt=""
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      flexShrink: 0,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      background: "#29251b",
                      color: "#d6b36a",
                      fontSize: 23,
                    }}
                  >
                    👤
                  </div>
                )}

                <div style={{ minWidth: 0 }}>
                  <h3
                    style={{
                      margin: 0,
                      color:
                        member.role === "OWNER"
                          ? "#e5c47d"
                          : "#f5f1e8",
                      fontSize: 16,
                    }}
                  >
                    {member.display_name || member.username}
                  </h3>

                  <p
                    style={{
                      margin: "5px 0",
                      color: "#999",
                      fontSize: 13,
                    }}
                  >
                    @{member.username}
                  </p>

                  <span
                    style={{
                      color: "#d6b36a",
                      fontSize: 12,
                    }}
                  >
                    {roleNames[member.role] || "عضو"}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
                      }
