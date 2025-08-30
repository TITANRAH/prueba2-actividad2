import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    console.log("email", email);
    console.log("password", password);

    // Simular validación de credenciales
    // normalmente lo haria con  next auth que se encarga de la autenticacion y la validacion de las credenciales
    // pero por ahora lo hago de forma manual ya que es mucho mas trabajo implementar next auth
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
