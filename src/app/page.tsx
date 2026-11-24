"use client";

import { useState } from "react";

export default function HomePage() {
  const [mode, setMode] = useState<"home" | "login" | "signup">("home");

  return (
    <main className="home-page">
      <div className="home-overlay" />

      <section className="welcome-card">
        <div className="crown">♛</div>

        <h1>العـظـماء👑</h1>

        <p className="welcome-text">
          عالم يجمع العظمة والتميز
        </p>

        {mode === "home" && (
          <div className="welcome-actions">
            <button
              className="main-button"
              onClick={() => setMode("login")}
            >
              تسجيل الدخول
            </button>

            <button
              className="secondary-button"
              onClick={() => setMode("signup")}
            >
              إنشاء حساب جديد
            </button>

            <button className="guest-button">
              الدخول كزائر
            </button>
          </div>
        )}

        {mode === "login" && (
          <div className="form-panel">
            <h2>تسجيل الدخول</h2>

            <input
              type="text"
              placeholder="اسم المستخدم أو البريد الإلكتروني"
            />

            <input
              type="password"
              placeholder="كلمة المرور"
            />

            <button className="main-button">
              دخول
            </button>

            <button
              className="close-button"
              onClick={() => setMode("home")}
            >
              رجوع
            </button>
          </div>
        )}

        {mode === "signup" && (
          <div className="form-panel">
            <h2>إنشاء حساب جديد</h2>

            <input
              type="text"
              placeholder="اسم المستخدم"
            />

            <input
              type="text"
              placeholder="اللقب"
            />

            <input
              type="email"
              placeholder="البريد الإلكتروني"
            />

            <input
              type="password"
              placeholder="كلمة المرور"
            />

            <button className="main-button">
              إنشاء الحساب
            </button>

            <button
              className="close-button"
              onClick={() => setMode("home")}
            >
              رجوع
            </button>
          </div>
        )}
      </section>

      <footer className="page-footer">
        العـظـماء👑
      </footer>
    </main>
  );
}
