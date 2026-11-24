
"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function updateProfile(
  formData: FormData
): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/");
  }

  const displayName = String(
    formData.get("display_name") ?? ""
  ).trim();

  const bio = String(
    formData.get("bio") ?? ""
  ).trim();

  if (!displayName || displayName.length > 40) {
    throw new Error(
      "الاسم الظاهر مطلوب وبحد أقصى 40 حرفًا."
    );
  }

  if (bio.length > 300) {
    throw new Error(
      "النبذة الشخصية يجب ألا تتجاوز 300 حرف."
    );
  }

  const { data: profile, error: profileError } =
    await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

  if (profileError || !profile) {
    throw new Error(
      "تعذر العثور على الملف الشخصي."
    );
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      display_name: displayName,
      bio,
    })
    .eq("id", user.id);

  if (updateError) {
    throw new Error(
      "تعذر حفظ التعديلات. حاول مرة أخرى."
    );
  }

  redirect("/dashboard/profile");
    }
