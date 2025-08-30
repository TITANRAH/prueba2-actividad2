import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Simular validación de credenciales
    if (email === "admin@admin.com" && password === "admin") {
      return NextResponse.json(
        { success: true, message: "Login exitoso" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Credenciales inválidas" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error interno" },
      { status: 500 }
    );
  }
}
