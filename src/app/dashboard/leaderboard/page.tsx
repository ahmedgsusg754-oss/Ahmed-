import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Profile = {
  id: string;
  username: string;
  display_name: string;
  role: string;
  avatar_url: string | null;
};

export default async function LeaderboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/");
  }

  const { data: currentProfile } = await supabase
    .from("profiles")
    .select("username, display_name, role")
    .eq("id", user.id)
    .maybeSingle();

  if (!currentProfile) {
    redirect("/dashboard");
  }

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, role, avatar_url")
    .limit(100);

  if (error) {
    return (
      <main
        dir="rtl"
        style={{
          minHeight: "100vh",
          background: "#080808",
          color: "#f5f1e8",
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
          <p>تعذر تحميل ترتيب الأعضاء حاليًا.</p>
          <Link
            href="/dashboard"
            style={{ color: "#d6b36a" }}
          >
            العودة للوحة الأعضاء
          </Link>
        </div>
      </main>
    );
  }

  const members = (profiles || []) as Profile[];

  // المالك الأساسي والمالك الاحتياطي يظهران أولًا.
  // الترتيب النهائي للمختارين سيُربط بإعدادات OWNER لاحقًا.
  const owners = members.filter(
    (member) =>
      member.role === "OWNER" ||
      member.role === "BACKUP_OWNER"
  );

  const regularMembers = members.filter(
    (member) =>
      member.role !== "OWNER" &&
      member.role !== "BACKUP_OWNER"
  );

  const orderedMembers = [...owners, ...regularMembers];

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
        padding: "35px 18px 60px",
        color: "#f5f1e8",
        background:
          "radial-gradient(circle at top, #282014, #101010 48%, #070707)",
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

        <header style={{ marginTop: 35, marginBottom: 28 }}>
          <p
            style={{
              color: "#b99a5b",
              fontSize: 13,
              letterSpacing: 2,
            }}
          >
            OZAMAA LEADERBOARD
          </p>

          <h1
            style={{
              color: "#e5c47d",
              fontSize: 29,
              margin: "8px 0",
            }}
          >
            ترتيب العـظـماء 👑
          </h1>

          <p style={{ color: "#aaa", lineHeight: 1.9 }}>
            المميزون باختيار المالك، ثم الأكثر تفاعلًا.
          </p>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(190px, 1fr))",
            gap: 12,
            marginBottom: 25,
          }}
        >
          <div
            style={{
              padding: 18,
              borderRadius: 16,
              background: "#19150e",
              border: "1px solid rgba(214,179,106,0.3)",
            }}
          >
            <div style={{ fontSize: 25 }}>👑</div>
            <h3 style={{ color: "#e5c47d" }}>
              اختيار المالك
            </h3>
            <p style={{ color: "#aaa", fontSize: 13 }}>
              أولوية خاصة للأعضاء الذين يختارهم OWNER.
            </p>
          </div>

          <div
            style={{
              padding: 18,
              borderRadius: 16,
              background: "#19150e",
              border: "1px solid rgba(214,179,106,0.3)",
            }}
          >
            <div style={{ fontSize: 25 }}>🔥</div>
            <h3 style={{ color: "#e5c47d" }}>
              الأكثر تفاعلًا
            </h3>
            <p style={{ color: "#aaa", fontSize: 13 }}>
              ترتيب بقية الأعضاء حسب نشاطهم الفعلي.
            </p>
          </div>
        </section>

        <section
          style={{
            padding: 20,
            borderRadius: 20,
            background: "rgba(255,255,255,0.035)",
            border: "1px solid rgba(214,179,106,0.25)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 20,
            }}
          >
            <h2
              style={{
                color: "#e5c47d",
                fontSize: 20,
                margin: 0,
              }}
            >
              قائمة الأعضاء
            </h2>

            <span style={{ color: "#999", fontSize: 13 }}>
              {orderedMembers.length} عضو
            </span>
          </div>

          {orderedMembers.length === 0 ? (
            <p style={{ color: "#aaa", textAlign: "center" }}>
              لا يوجد أعضاء حتى الآن.
            </p>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {orderedMembers.map((member, index) => {
                const isOwner =
                  member.role === "OWNER";

                const isBackup =
                  member.role === "BACKUP_OWNER";

                return (
                  <article
                    key={member.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 13,
                      padding: 15,
                      borderRadius: 15,
                      background: isOwner
                        ? "rgba(214,179,106,0.12)"
                        : "#171717",
                      border: isOwner
                        ? "1px solid #c9a45e"
                        : "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div
                      style={{
                        minWidth: 34,
                        height: 34,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        background: "#29251b",
                        color: "#e5c47d",
                        fontWeight: "bold",
                      }}
                    >
                      {index + 1}
                    </div>

                    {member.avatar_url ? (
                      <img
                        src={member.avatar_url}
                        alt=""
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "1px solid #a98a4f",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          display: "grid",
                          placeItems: "center",
                          background: "#29251b",
                          fontSize: 23,
                        }}
                      >
                        👤
                      </div>
                    )}

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3
                        style={{
                          color: isOwner
                            ? "#e5c47d"
                            : "#eee",
                          fontSize: 15,
                          margin: "0 0 5px",
                        }}
                      >
                        {member.display_name || member.username}
                      </h3>

                      <p
                        style={{
                          color: "#999",
                          fontSize: 12,
                          margin: 0,
                        }}
                      >
                        @{member.username}
                      </p>
                    </div>

                    <span
                      style={{
                        color: isOwner || isBackup
                          ? "#e5c47d"
                          : "#aaa",
                        fontSize: 11,
                        textAlign: "left",
                      }}
                    >
                      {roleNames[member.role] || "عضو"}
                    </span>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <p
          style={{
            color: "#777",
            fontSize: 12,
            textAlign: "center",
            lineHeight: 1.9,
            marginTop: 25,
          }}
        >
          ملاحظة: هذه نسخة العرض الأولية. لم يتم ربط نقاط
          التفاعل أو قائمة اختيارات المالك بقاعدة البيانات بعد.
        </p>
      </div>
    </main>
  );
}
