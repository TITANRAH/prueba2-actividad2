"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pwd }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/dashboard");
      } else {
        setErr(data.message || "Credenciales inválidas");
      }
    } catch (error) {
      setErr("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const disabled = !email || !pwd || loading;

  return (
    <main className="max-w-420 mx-auto font-system-ui flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Login</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 w-80">
        <input
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          disabled={disabled}
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
      {err && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-red-700 text-center">{err}</p>
        </div>
      )}
    </main>
  );
}
