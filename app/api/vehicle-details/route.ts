/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/vehicle-details/route.ts
import { NextResponse } from "next/server";
import { tecdocCall, qp, qpn } from "@/lib/tecdoc";
import { ENV } from "@/lib/env";
import { logDebug, logError } from "@/lib/logger";

export const dynamic = "force-dynamic";

type NormalizedVehicle = {
  manuId?: number;
  manuName?: string;
  modelSeriesId?: number;
  modelSeriesName?: string;
  typeId?: number; // == carId / kType
  typeName?: string;
};

function normalizeVehicleShape(raw: any): NormalizedVehicle {
  const v = raw?.data?.array?.[0] ?? raw?.data ?? raw ?? {};
  const n: NormalizedVehicle = {
    manuId: v.manuId ?? v.manufacturerId ?? v.manuNo ?? v?.manufacturer?.id,
    manuName: v.manuName ?? v.manufacturerName ?? v?.manufacturer?.name,
    modelSeriesId: v.modelSeriesId ?? v.modId ?? v?.modelSeries?.id,
    modelSeriesName: v.modelSeriesName ?? v.modelName ?? v?.modelSeries?.name,
    typeId: v.typeId ?? v.carId ?? v.kType ?? v.vehicleId ?? v?.vehicle?.id,
    typeName: v.typeName ?? v.carName ?? v.vehicleName ?? v?.vehicle?.name,
  };
  return n;
}

export async function GET(req: Request) {
  const carId = qpn(req, "carId");
  const country = qp(req, "country", ENV.TECDOC_LINKAGE_COUNTRY);
  const lang = qp(req, "lang", ENV.TECDOC_LANG_DEFAULT);

  if (!carId)
    return NextResponse.json({ error: "Missing carId" }, { status: 400 });

  try {
    logDebug("[TecDoc] VEHICLE_DETAILS_TRY_1", { carId });
    const r1 = await tecdocCall("getVehicleByIds4", {
      country,
      lang,
      vehicleIds: { array: [carId] },
      linkingTargetId: carId,
      linkingTargetType: "P",
    });
    const norm1 = normalizeVehicleShape(r1);
    if (norm1?.typeId) {
      return NextResponse.json(
        {
          ok: true,
          source: "getVehicleByIds4",
          normalized: norm1,
          data: r1?.data,
        },
        {
          headers: { "Cache-Control": "private, max-age=300" },
        }
      );
    }
  } catch (e) {
    logError("[TecDoc] VEHICLE_DETAILS_TRY_1_FAIL", {
      message: String((e as Error).message),
    });
  }

  try {
    logDebug("[TecDoc] VEHICLE_DETAILS_TRY_2", { carId });
    const r2 = await tecdocCall("getLinkageTargets", {
      country,
      lang,
      linkingTargetId: carId,
      linkingTargetType: "P",
      includeLinkedData: true,
      includeDetails: true,
    });
    const norm2 = normalizeVehicleShape(r2);
    return NextResponse.json(
      {
        ok: true,
        source: "getLinkageTargets",
        normalized: norm2,
        data: r2?.data,
      },
      {
        headers: { "Cache-Control": "private, max-age=300" },
      }
    );
  } catch (e) {
    logError("[TecDoc] VEHICLE_DETAILS_TRY_2_FAIL", {
      message: String((e as Error).message),
    });
    return NextResponse.json(
      { error: "Kon voertuigdetails niet ophalen" },
      { status: 502 }
    );
  }
}
