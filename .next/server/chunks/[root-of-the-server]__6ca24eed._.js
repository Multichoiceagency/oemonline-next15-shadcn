module.exports = [
"[project]/Documents/oemonline-next15-shadcn/.next-internal/server/app/api/vehicle-details/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Documents/oemonline-next15-shadcn/lib/env.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/env.ts
__turbopack_context__.s([
    "ENV",
    ()=>ENV
]);
function req(name) {
    const v = process.env[name];
    if (!v) throw new Error(`Missing env var: ${name}`);
    return v;
}
function boolEnv(name, def = false) {
    const v = process.env[name];
    if (v == null) return def;
    return [
        "1",
        "true",
        "yes",
        "on"
    ].includes(String(v).toLowerCase());
}
const ENV = {
    TECDOC_BASE_JSON: req("TECDOC_BASE_JSON"),
    TECDOC_API_KEY: req("TECDOC_API_KEY"),
    TECDOC_PROVIDER_ID: Number(req("TECDOC_PROVIDER_ID")),
    TECDOC_LANG_DEFAULT: process.env.TECDOC_LANG_DEFAULT ?? "nl",
    TECDOC_LINKAGE_COUNTRY: process.env.TECDOC_LINKAGE_COUNTRY ?? "nl",
    TECDOC_ARTICLE_COUNTRIES: (process.env.TECDOC_ARTICLE_COUNTRIES ?? "nl").split(",").map((s)=>s.trim()),
    // ← belangrijke flags
    TECDOC_PLATE_ENABLED: boolEnv("TECDOC_PLATE_ENABLED", false),
    TECDOC_PLATE_COUNTRY: process.env.TECDOC_PLATE_COUNTRY ?? "nl"
};
}),
"[project]/Documents/oemonline-next15-shadcn/lib/logger.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/logger.ts
__turbopack_context__.s([
    "logDebug",
    ()=>logDebug,
    "logError",
    ()=>logError
]);
function logDebug(label, obj) {
    try {
        console.debug(label, obj ?? "");
    } catch  {}
}
function logError(label, obj) {
    try {
        console.error(label, obj ?? "");
    } catch  {}
}
}),
"[project]/Documents/oemonline-next15-shadcn/lib/tecdoc.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ // lib/tecdoc.ts
__turbopack_context__.s([
    "TecdocOps",
    ()=>TecdocOps,
    "qp",
    ()=>qp,
    "qpn",
    ()=>qpn,
    "tecdocCall",
    ()=>tecdocCall
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/oemonline-next15-shadcn/lib/env.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/oemonline-next15-shadcn/lib/logger.ts [app-route] (ecmascript)");
;
;
function qp(req, key, fallback) {
    const v = new URL(req.url).searchParams.get(key);
    return v ?? fallback ?? undefined;
}
function qpn(req, key, fallback) {
    const v = new URL(req.url).searchParams.get(key);
    if (v == null) return fallback;
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
}
const TecdocOps = {
    // voertuigen
    manufacturers: "getManufacturers",
    modelSeries: "getModelSeries",
    vehicleIdsByCriteria: "getVehicleIdsByCriteria",
    vehiclesByPlate: "getVehiclesByKeyNumberPlates",
    // artikelen / merken (optioneel elders gebruikt)
    articles: "getArticles",
    brands: "getBrands",
    amBrands: "getAmBrands",
    articleByIds6: "getArticleDirectSearchByIds6",
    articleAssignedByIds6: "getAssignedArticlesByIds6",
    // aliassen
    articleById: "getArticles",
    articleImages: "getArticles"
};
/** Zorg dat page/perPage altijd integers zijn (Pegasus is strikt). */ function normalizePaging(params) {
    const p = {
        ...params
    };
    if (typeof p.page === "object" && p.page) {
        const n = Number(p.page.number ?? p.page.page ?? 1);
        const s = Number(p.page.size ?? p.page.perPage ?? p.perPage ?? 25);
        p.page = Number.isFinite(n) ? n : 1;
        p.perPage = Number.isFinite(s) ? s : 25;
    }
    if (!Number.isFinite(p.page)) p.page = 1;
    if (!Number.isFinite(p.perPage)) delete p.perPage;
    return p;
}
async function tecdocCall(resource, params) {
    const base = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_BASE_JSON;
    const provider = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_PROVIDER_ID;
    const lang = params.lang ?? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LANG_DEFAULT;
    const country = params.country ?? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LINKAGE_COUNTRY;
    let bodyParams = {
        provider,
        lang,
        country,
        countryCode: country,
        articleCountry: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_ARTICLE_COUNTRIES[0],
        ...params
    };
    bodyParams = normalizePaging(bodyParams);
    const payload = {
        [resource]: bodyParams
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logDebug"])("[TecDoc] REQUEST", {
        resource,
        url: base,
        body: payload
    });
    const res = await fetch(base, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_API_KEY
        },
        body: JSON.stringify(payload),
        keepalive: true
    });
    const text = await res.text().catch(()=>"");
    if (!res.ok) {
        throw new Error(`TecDoc ${resource} ${res.status}: ${text}`);
    }
    let json = {};
    try {
        json = text ? JSON.parse(text) : {};
    } catch  {
        throw new Error(`TecDoc ${resource}: invalid JSON response`);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logDebug"])("[TecDoc] RESPONSE", json?.status ? json : {
        resource,
        status: 200
    });
    return json;
}
}),
"[project]/Documents/oemonline-next15-shadcn/app/api/vehicle-details/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ // app/api/vehicle-details/route.ts
__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/oemonline-next15-shadcn/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/oemonline-next15-shadcn/lib/tecdoc.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/oemonline-next15-shadcn/lib/env.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/oemonline-next15-shadcn/lib/logger.ts [app-route] (ecmascript)");
;
;
;
;
const dynamic = "force-dynamic";
function normalizeVehicleShape(raw) {
    const v = raw?.data?.array?.[0] ?? raw?.data ?? raw ?? {};
    const n = {
        manuId: v.manuId ?? v.manufacturerId ?? v.manuNo ?? v?.manufacturer?.id,
        manuName: v.manuName ?? v.manufacturerName ?? v?.manufacturer?.name,
        modelSeriesId: v.modelSeriesId ?? v.modId ?? v?.modelSeries?.id,
        modelSeriesName: v.modelSeriesName ?? v.modelName ?? v?.modelSeries?.name,
        typeId: v.typeId ?? v.carId ?? v.kType ?? v.vehicleId ?? v?.vehicle?.id,
        typeName: v.typeName ?? v.carName ?? v.vehicleName ?? v?.vehicle?.name
    };
    return n;
}
async function GET(req) {
    const carId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["qpn"])(req, "carId");
    const country = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["qp"])(req, "country", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LINKAGE_COUNTRY);
    const lang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["qp"])(req, "lang", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LANG_DEFAULT);
    if (!carId) return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Missing carId"
    }, {
        status: 400
    });
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logDebug"])("[TecDoc] VEHICLE_DETAILS_TRY_1", {
            carId
        });
        const r1 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tecdocCall"])("getVehicleByIds4", {
            country,
            lang,
            vehicleIds: {
                array: [
                    carId
                ]
            },
            linkingTargetId: carId,
            linkingTargetType: "P"
        });
        const norm1 = normalizeVehicleShape(r1);
        if (norm1?.typeId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: true,
                source: "getVehicleByIds4",
                normalized: norm1,
                data: r1?.data
            }, {
                headers: {
                    "Cache-Control": "private, max-age=300"
                }
            });
        }
    } catch (e) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logError"])("[TecDoc] VEHICLE_DETAILS_TRY_1_FAIL", {
            message: String(e.message)
        });
    }
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logDebug"])("[TecDoc] VEHICLE_DETAILS_TRY_2", {
            carId
        });
        const r2 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tecdocCall"])("getLinkageTargets", {
            country,
            lang,
            linkingTargetId: carId,
            linkingTargetType: "P",
            includeLinkedData: true,
            includeDetails: true
        });
        const norm2 = normalizeVehicleShape(r2);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            source: "getLinkageTargets",
            normalized: norm2,
            data: r2?.data
        }, {
            headers: {
                "Cache-Control": "private, max-age=300"
            }
        });
    } catch (e) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logError"])("[TecDoc] VEHICLE_DETAILS_TRY_2_FAIL", {
            message: String(e.message)
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Kon voertuigdetails niet ophalen"
        }, {
            status: 502
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6ca24eed._.js.map