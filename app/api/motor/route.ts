import { NextResponse } from "next/server";
import { tecdocCall, qp } from "@/lib/tecdoc";
import { ENV } from "@/lib/env";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const motorId = qp(req, "motorId");
  const carType = qp(req, "carType", "P");
  if (!motorId)
    return NextResponse.json({ error: "Missing motorId" }, { status: 400 });
  if (!["P", "O", "L"].includes(carType!))
    return NextResponse.json(
      { error: "Invalid carType (P|O|L)" },
      { status: 400 }
    );

  const data = await tecdocCall("getVehicleIdsByMotor2", {
    carType,
    countriesCarSelection: ENV.TECDOC_LINKAGE_COUNTRY,
    countryGroupFlag: false,
    lang: ENV.TECDOC_LANG_DEFAULT,
    motorId: Number(motorId),
    provider: Number(ENV.TECDOC_PROVIDER_ID),
  });
  return NextResponse.json(data, {
    headers: { "Cache-Control": "private, max-age=300" },
  });
}
