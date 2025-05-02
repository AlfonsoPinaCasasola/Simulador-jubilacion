import { useState } from "react";

export default function RetirementSimulator() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(30);
  const [aporte, setAporte] = useState(2000);
  const [resultado25, setResultado25] = useState(null);
  const [resultado65, setResultado65] = useState(null);

  const calcular = () => {
    const plazo = 25;
    const inflacion = 0.04;
    const rendimiento = 0.09;
    const tasa_real = (1 + rendimiento) / (1 + inflacion) - 1;
    const interes_mensual = Math.pow(1 + tasa_real, 1 / 12) - 1;

    let saldo = 0;
    for (let i = 0; i < plazo * 12; i++) {
      saldo = saldo * (1 + interes_mensual) + Number(aporte);
    }
    const monto25 = saldo;

    const edad_final = Number(edad) + plazo;
    const meses_restantes = (65 - edad_final) * 12;
    for (let i = 0; i < meses_restantes; i++) {
      saldo = saldo * (1 + interes_mensual);
    }
    const monto65 = saldo;

    setResultado25(monto25);
    setResultado65(monto65);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-2xl shadow">
      <img src="/logo-truth.png" alt="Logo Truth Solutions" className="w-48 mx-auto mb-4" />
      <img src="/foto-asesor.png" alt="Asesor" className="w-24 h-24 rounded-full mx-auto mb-4" />
      <h1 className="text-xl font-bold text-center mb-4">Simulador de Retiro Personalizado</h1>

      <input
        type="text"
        placeholder="Tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="number"
        placeholder="Tu edad"
        value={edad}
        onChange={(e) => setEdad(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="number"
        placeholder="Aportación mensual (mínimo $2,000)"
        value={aporte}
        onChange={(e) => setAporte(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button
        onClick={calcular}
        className="bg-blue-700 text-white w-full py-2 rounded hover:bg-blue-800"
      >
        Calcular
      </button>

      {resultado25 && (
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold">
            {nombre && `Estimado ${nombre},`} si ahorras ${aporte} pesos al mes:
          </p>
          <p className="mt-2">💰 Al año 25 tendrás aproximadamente <strong>${resultado25.toLocaleString()}</strong></p>
          <p className="mt-2">🧓 A los 65 años, tu monto podría crecer hasta <strong>${resultado65.toLocaleString()}</strong></p>
          <p className="mt-4 italic text-gray-700">
            "El mejor momento para ahorrar fue ayer. El segundo mejor momento es hoy."
          </p>
          <a
            href="https://wa.me/5218114784845"
            target="_blank"
            className="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            📲 Habla con tu asesor ahora por WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}