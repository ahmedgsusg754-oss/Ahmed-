"use server";

import { createClient } from "@/lib/supabase/server";

type AuthResult = {
  success: boolean;
  message: string;
};

export async function signUp(
  formData: FormData
): Promise<AuthResult> {
  try {
    const supabase = await createClient();

    const username = String(
      formData.get("username") || ""
    ).trim();

    const displayName = String(
      formData.get("display_name") || ""
    ).trim();

    const email = String(
      formData.get("email") || ""
    ).trim().toLowerCase();

    const password = String(
      formData.get("password") || ""
    );

    if (!username || !displayName || !email || !password) {
      return {
        success: false,
        message: "يرجى ملء جميع البيانات.",
      };
    }

    if (username.length < 3 || username.length > 30) {
      return {
        success: false,
        message: "اسم المستخدم يجب أن يكون بين 3 و30 حرفًا.",
      };
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return {
        success: false,
        message: "اسم المستخدم يقبل الحروف الإنجليزية والأرقام والشرطة السفلية فقط.",
      };
    }

    if (password.length < 8) {
      return {
        success: false,
        message: "كلمة المرور يجب ألا تقل عن 8 أحرف.",
      };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          display_name: displayName,
        },
      },
    });

    if (error) {
      return {
        success: false,
        message: "تعذر إنشاء الحساب. تأكد من البيانات وحاول مرة أخرى.",
      };
    }

    return {
      success: true,
      message: "تم إرسال طلب إنشاء الحساب. تحقق من بريدك الإلكتروني إذا طُلب منك ذلك.",
    };
  } catch {
    return {
      success: false,
      message: "حدث خطأ أثناء إنشاء الحساب.",
    };
  }
}

export async function signIn(
  formData: FormData
): Promise<AuthResult> {
  try {
    const supabase = await createClient();

    const email = String(
      formData.get("email") || ""
    ).trim().toLowerCase();

    const password = String(
      formData.get("password") || ""
    );

    if (!email || !password) {
      return {
        success: false,
        message: "أدخل البريد الإلكتروني وكلمة المرور.",
      };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        message: "بيانات تسجيل الدخول غير صحيحة.",
      };
    }

    return {
      success: true,
      message: "تم تسجيل الدخول بنجاح.",
    };
  } catch {
    return {
      success: false,
      message: "حدث خطأ أثناء تسجيل الدخول.",
    };
  }
}

export async function signOut(): Promise<AuthResult> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        message: "تعذر تسجيل الخروج.",
      };
    }

    return {
      success: true,
      message: "تم تسجيل الخروج بنجاح.",
    };
  } catch {
    return {
      success: false,
      message: "حدث خطأ أثناء تسجيل الخروج.",
    };
  }
}
