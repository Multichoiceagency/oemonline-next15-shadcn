module.exports = [
"[project]/Documents/oemonline-next15-shadcn/.next-internal/server/app/api/vehicles/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

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

/* eslint-disable @typescript-eslint/no-explicit-any */ // lib/env.ts
__turbopack_context__.s([
    "ENV",
    ()=>ENV
]);
function toBool(v, def = false) {
    if (v === undefined || v === null || v === "") return def;
    const s = String(v).trim().toLowerCase();
    return [
        "1",
        "true",
        "yes",
        "y",
        "on"
    ].includes(s);
}
function toNum(v, def) {
    const n = Number(v);
    return Number.isFinite(n) ? n : def;
}
/** Parse CSV ("nl,be,lu") OR JSON ('["nl","be","lu"]') → string[] */ function toStrArray(v) {
    if (!v) return [];
    const s = String(v).trim();
    try {
        const parsed = JSON.parse(s);
        if (Array.isArray(parsed)) return parsed.map((x)=>String(x));
    } catch  {
        return s.split(",").map((x)=>x.trim()).filter(Boolean);
    }
    return [];
}
/** Validate target type (P/L/K/T/B/M). Fallback 'P'. */ function toTargetType(v) {
    const s = String(v || "").trim().toUpperCase();
    return [
        "P",
        "L",
        "K",
        "T",
        "B",
        "M"
    ].includes(s) ? s : "P";
}
const ENV = {
    // TecDoc base
    TECDOC_BASE_JSON: process.env.TECDOC_BASE_JSON || "",
    TECDOC_API_KEY: process.env.TECDOC_API_KEY || "",
    TECDOC_PROVIDER_ID: process.env.TECDOC_PROVIDER_ID || "",
    // Locale / geo
    TECDOC_LANG_DEFAULT: process.env.TECDOC_LANG_DEFAULT || "nl",
    TECDOC_LANGS: toStrArray(process.env.TECDOC_LANGS),
    TECDOC_LINKAGE_COUNTRY: process.env.TECDOC_LINKAGE_COUNTRY || "nl",
    TECDOC_COUNTRY_GROUP: process.env.TECDOC_COUNTRY_GROUP || undefined,
    TECDOC_CURRENCY: process.env.TECDOC_CURRENCY || undefined,
    // Articles
    TECDOC_ARTICLE_COUNTRIES: toStrArray(process.env.TECDOC_ARTICLE_COUNTRIES),
    // Target type (personenauto standaard)
    TECDOC_DEFAULT_TARGET: toTargetType(process.env.TECDOC_DEFAULT_TARGET ?? process.env.TECDOC_LINKING_TARGET_TYPE),
    // Plate lookup (tenant-specific)
    TECDOC_PLATE_ENABLED: toBool(process.env.TECDOC_PLATE_ENABLED, false),
    TECDOC_PLATE_COUNTRY: process.env.TECDOC_PLATE_COUNTRY || process.env.TECDOC_LINKAGE_COUNTRY || "nl",
    TECDOC_PLATE_KEY_SYSTEM_NUMBER: process.env.TECDOC_PLATE_KEY_SYSTEM_NUMBER || "",
    // Misc
    TECDOC_DOWNLOAD_IMAGES: toBool(process.env.TECDOC_DOWNLOAD_IMAGES, false),
    TECDOC_DEBUG: toBool(process.env.TECDOC_DEBUG, false),
    TECDOC_TIMEOUT_MS: toNum(process.env.TECDOC_TIMEOUT_MS, 15000),
    // Supabase / DB / Secrets (server-only)
    SUPABASE_URL: process.env.SUPABASE_URL || "",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
    JWT_SECRET: process.env.JWT_SECRET || "",
    COOKIE_SECRET: process.env.COOKIE_SECRET || "",
    DATABASE_URL: process.env.DATABASE_URL || "",
    DATABASE_EXTRA: process.env.DATABASE_EXTRA || ""
};
}),
"[project]/Documents/oemonline-next15-shadcn/lib/logger.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ // lib/logger.ts
__turbopack_context__.s([
    "logDebug",
    ()=>logDebug,
    "logError",
    ()=>logError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/oemonline-next15-shadcn/lib/env.ts [app-route] (ecmascript)");
;
function logDebug(label, data) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_DEBUG) return;
    try {
        console.log(`[TecDoc] ${label}`, data ?? "");
    } catch  {}
}
function logError(label, data) {
    try {
        console.error(`[TecDoc][ERROR] ${label}:`, data ?? "");
    } catch  {}
}
}),
"[project]/Documents/oemonline-next15-shadcn/lib/tecdoc.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ // lib/tecdoc.ts
__turbopack_context__.s([
    "TECDOC_ENDPOINT",
    ()=>TECDOC_ENDPOINT,
    "TecdocOps",
    ()=>TecdocOps,
    "VehicleTargetType",
    ()=>VehicleTargetType,
    "extractArray",
    ()=>extractArray,
    "qp",
    ()=>qp,
    "qpn",
    ()=>qpn,
    "tecdocCall",
    ()=>tecdocCall,
    "toArrayParam",
    ()=>toArrayParam
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/oemonline-next15-shadcn/lib/env.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/oemonline-next15-shadcn/lib/logger.ts [app-route] (ecmascript)");
;
;
const TecdocOps = {
    // Vehicle tree
    manufacturers: "getManufacturers",
    modelSeries: "getModelSeries",
    types: "getTypes",
    // Vehicle details / linkages
    vehiclesByIds2: "getVehiclesByIds2",
    linkageTargets: "getLinkageTargets",
    linkageTargetsByCarIds: "getLinkageTargetsByCarIds",
    vehicleByVinV3: "getVehicleByVIN",
    vehiclesByVin2: "getVehiclesByVIN2",
    // Plate
    vehiclesByPlate: "getVehiclesByKeyNumberPlates",
    // Brands
    amBrands: "getAmBrands",
    // Categories (Generic Articles)
    genericArticles: "getGenericArticles",
    genericArticlesByLinkingTarget: "getGenericArticlesByLinkingTarget",
    // Assigned articles
    assignedByLinkingTarget: "getAssignedArticlesByLinkingTarget",
    assignedByLinkingTarget2: "getAssignedArticlesByLinkingTarget2",
    assignedByLinkingTarget3: "getAssignedArticlesByLinkingTarget3",
    assignedByIds6: "getAssignedArticlesByIds6",
    // Article search / details / media
    articleSearchByTerm: "articleSearchByTerm",
    articleDirectSearchV3: "articleDirectSearchV3",
    articlesByVehicleV3: "getArticlesByVehicle",
    articleById: "getArticles",
    articleMediaByIds: "getArticleMediaByIds",
    articleMediaByIds6: "getArticleMediaByIds6"
};
function qp(req, key, def) {
    const url = new URL(req.url);
    const val = url.searchParams.get(key);
    return val == null ? def : val;
}
function qpn(req, key, def) {
    const v = qp(req, key);
    if (v == null) return def;
    const n = Number(v);
    return Number.isFinite(n) ? n : def;
}
function toArrayParam(a) {
    if (!a || a.length === 0) return undefined;
    return {
        array: a
    };
}
function extractArray(data) {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.array)) return data.array;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.data?.array)) return data.data.array;
    return [];
}
function clean(obj) {
    const out = {};
    for (const [k, v] of Object.entries(obj)){
        if (v === undefined || v === null) continue;
        if (typeof v === "string" && v.trim() === "") continue;
        out[k] = v;
    }
    return out;
}
function withApiKey(url, apiKey) {
    if (!apiKey) return url;
    const hasQuery = url.includes("?");
    return url + (hasQuery ? "&" : "?") + "api_key=" + encodeURIComponent(apiKey);
}
const TECDOC_ENDPOINT = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_BASE_JSON || "https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint";
const VehicleTargetType = {
    Passenger: "P",
    Transporter: "L",
    Truck: "K",
    Tractor: "T",
    Bike: "B",
    Engine: "M"
};
const COMMON_DEFAULTS = clean({
    lang: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LANG_DEFAULT,
    country: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LINKAGE_COUNTRY,
    countryCode: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LINKAGE_COUNTRY,
    countryGroup: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_COUNTRY_GROUP,
    currency: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_CURRENCY,
    articleCountry: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_ARTICLE_COUNTRIES && __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_ARTICLE_COUNTRIES[0] ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_ARTICLE_COUNTRIES[0] : __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LINKAGE_COUNTRY
});
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 40;
const MAX_PER_PAGE = 500;
function withPageDefaults(payload) {
    const page = Number(payload.page ?? DEFAULT_PAGE);
    const perPageRaw = Number(payload.perPage ?? DEFAULT_PER_PAGE);
    const perPage = Math.max(1, Math.min(MAX_PER_PAGE, perPageRaw || DEFAULT_PER_PAGE));
    return {
        ...payload,
        page,
        perPage
    };
}
function withTargetType(payload) {
    const linkingTargetType = payload.linkingTargetType || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_DEFAULT_TARGET || VehicleTargetType.Passenger;
    return {
        ...payload,
        linkingTargetType
    };
}
function withTenantExtras(resource, payload) {
    if (resource === TecdocOps.vehiclesByPlate) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_PLATE_KEY_SYSTEM_NUMBER) {
            payload.keySystemNumber = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_PLATE_KEY_SYSTEM_NUMBER;
        }
        payload.country = payload.country || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_PLATE_COUNTRY || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LINKAGE_COUNTRY;
    }
    return payload;
}
async function tecdocCall(resource, payload) {
    let fields = clean({
        provider: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_PROVIDER_ID,
        ...COMMON_DEFAULTS,
        ...payload
    });
    fields = withPageDefaults(fields);
    const needsTargetType = resource === TecdocOps.assignedByLinkingTarget || resource === TecdocOps.assignedByLinkingTarget2 || resource === TecdocOps.assignedByLinkingTarget3 || resource === TecdocOps.genericArticlesByLinkingTarget || resource === TecdocOps.linkageTargets || resource === TecdocOps.linkageTargetsByCarIds;
    if (needsTargetType) fields = withTargetType(fields);
    fields = withTenantExtras(resource, fields);
    fields = clean(fields);
    const bodyObj = {
        [resource]: fields
    };
    const url = withApiKey(TECDOC_ENDPOINT, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_API_KEY);
    const controller = new AbortController();
    setTimeout(()=>controller.abort(), Math.max(3000, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_TIMEOUT_MS || 15000));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logDebug"])("REQUEST", {
        resource,
        url,
        body: bodyObj
    });
    // You may want to add the actual fetch/request logic here, e.g.:
    // const response = await fetch(url, { ... });
    // return await response.json();
    // Temporary mock return to satisfy return type
    return {};
}
}),
"[project]/Documents/oemonline-next15-shadcn/app/api/vehicles/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/vehicles/route.ts
/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_context__.s([
    "GET",
    ()=>GET,
    "HEAD",
    ()=>HEAD,
    "OPTIONS",
    ()=>OPTIONS,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/oemonline-next15-shadcn/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/server.js [app-route] (ecmascript)");
// Alias import om naamconflicten te voorkomen
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/oemonline-next15-shadcn/lib/tecdoc.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/oemonline-next15-shadcn/lib/env.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/oemonline-next15-shadcn/lib/logger.ts [app-route] (ecmascript)");
;
;
;
;
const dynamic = "force-dynamic";
function jsonOK(body, init) {
    let responseInit;
    if (typeof init === "number") {
        responseInit = {
            status: init
        };
    } else {
        responseInit = init;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(body, responseInit);
}
function jsonERR(body, init) {
    const status = typeof init === "number" ? init : typeof init === "object" && init?.status ? init.status : 200;
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(body, {
        status
    });
}
function toInt(value) {
    if (!value) return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
}
function asArray(maybeArr) {
    if (!maybeArr) return [];
    if (Array.isArray(maybeArr)) return maybeArr;
    if (maybeArr?.item) return asArray(maybeArr.item);
    if (typeof maybeArr === "object") return [
        maybeArr
    ];
    return [];
}
function maybeAttachDebug(meta, debugFlag, raw) {
    if (debugFlag === "1" || debugFlag === "true") meta._debugRaw = raw;
    return meta;
}
function slugify(s) {
    return (s || "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}
// Personenauto’s (Vehicle) en motoren (Engine)
const LTT_VEHICLE = "V"; // Passenger Car
const LTT_ENGINE = "M"; // Engine
// Veelvoorkomende alias → merknaam (strikt maar met vaste aliassen)
const MANUFACTURER_ALIASES = {
    "am": "Aston Martin",
    "a-m": "Aston Martin",
    "aston-martin": "Aston Martin",
    "mb": "Mercedes-Benz",
    "mercedes": "Mercedes-Benz",
    "mercedes-benz": "Mercedes-Benz",
    "vw": "Volkswagen",
    "v-w": "Volkswagen",
    "bmw": "BMW",
    "b-m-w": "BMW",
    "vauxhall": "Opel",
    "skoda": "Škoda",
    "škoda": "Škoda"
};
// ---------------------------------------------------------------------------
// Normalizers (defensief tegen variërende TecDoc shapes)
// ---------------------------------------------------------------------------
function normManu(m) {
    return {
        id: m?.manuId ?? m?.manuNo ?? m?.id ?? m?.manuID ?? null,
        name: m?.manuName ?? m?.name ?? m?.text ?? "",
        slug: slugify(m?.manuName ?? m?.name ?? m?.text ?? "")
    };
}
function normModel(m) {
    const id = m?.modelSeriesId ?? m?.modId ?? m?.id ?? m?.modelId ?? m?.modelseriesID ?? null;
    const name = m?.modelSeriesName ?? m?.modelname ?? m?.name ?? m?.text ?? "";
    return {
        id: id ? Number(id) : null,
        name,
        slug: slugify(name),
        fromYear: m?.yearOfConstructionFrom ?? m?.constructionStart ?? m?.from ?? null,
        toYear: m?.yearOfConstructionTo ?? m?.constructionEnd ?? m?.to ?? null
    };
}
/** Types = uitvoeringen/varianten binnen modelserie */ function normType(t) {
    const kw = t?.powerKW ?? t?.powerKw ?? t?.kW ?? t?.engineOutputKw ?? null;
    const hp = t?.powerHP ?? t?.hp ?? t?.PS ?? t?.engineOutputHp ?? null;
    const id = t?.typeId ?? t?.kTypNr ?? t?.ktypNr ?? t?.ktypnr ?? t?.typeNo ?? null;
    const name = t?.typeName ?? t?.carName ?? t?.name ?? t?.description ?? "";
    return {
        id: id ? Number(id) : null,
        name,
        engineCode: t?.engineCode ?? t?.engine ?? null,
        fuel: t?.fuelType ?? t?.fuel ?? t?.fuelTypeName ?? null,
        body: t?.bodyType ?? t?.body ?? null,
        powerKW: kw ? Number(kw) : null,
        powerHP: hp ? Number(hp) : null,
        ccm: t?.capacityCCM ?? t?.cubicCapacity ?? t?.displacementCCM ?? t?.ccm ?? null,
        fromYear: t?.yearOfConstructionFrom ?? t?.constructionStart ?? t?.from ?? null,
        toYear: t?.yearOfConstructionTo ?? t?.constructionEnd ?? t?.to ?? null
    };
}
function normVehicle(v) {
    const k = v?.kTypNr ?? v?.ktypNr ?? v?.ktypnr ?? v?.typeId ?? null;
    return {
        ktypNr: k ? Number(k) : null,
        manufacturer: v?.manuName ?? v?.manufacturerName ?? null,
        model: v?.modelName ?? v?.modelSeriesName ?? null,
        typeName: v?.typeName ?? v?.carName ?? v?.name ?? null,
        engineCode: v?.engineCode ?? v?.engine ?? null,
        fuel: v?.fuelType ?? v?.fuel ?? null,
        body: v?.bodyType ?? v?.body ?? null,
        powerKW: v?.powerKW ?? v?.engineOutputKw ?? null,
        powerHP: v?.powerHP ?? v?.engineOutputHp ?? null,
        ccm: v?.capacityCCM ?? v?.cubicCapacity ?? v?.displacementCCM ?? v?.ccm ?? null,
        fromYear: v?.yearOfConstructionFrom ?? v?.constructionStart ?? v?.from ?? null,
        toYear: v?.yearOfConstructionTo ?? v?.constructionEnd ?? v?.to ?? null,
        doors: v?.doors ?? v?.numberOfDoors ?? null,
        cylinders: v?.cylinders ?? null,
        transmission: v?.transmission ?? v?.gearbox ?? null
    };
}
// ---------------------------------------------------------------------------
/** Exacte resolvers (géén fuzzy). Retourneert null als er geen 1-op-1 match is. */ // ---------------------------------------------------------------------------
async function resolveManufacturerId(opts) {
    const { nameOrAlias, lang, country, countryCode, articleCountry } = opts;
    if (!nameOrAlias) return null;
    const lowered = (nameOrAlias || "").toLowerCase().trim();
    const aliasName = MANUFACTURER_ALIASES[lowered] || nameOrAlias;
    const wantedSlug = slugify(aliasName);
    const wantedLower = aliasName.toLowerCase();
    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tecdocCall"])("getManufacturers", {
        provider: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_PROVIDER_ID,
        lang,
        country,
        countryCode,
        articleCountry,
        linkingTargetType: LTT_VEHICLE
    });
    const list = asArray(res?.data?.array).map(normManu).filter((m)=>m.id && m.name);
    const found = list.find((m)=>m.slug === wantedSlug || (m.name || "").toLowerCase() === wantedLower);
    return found ? Number(found.id) : null;
}
async function resolveModelId(opts) {
    const { manufacturerId, modelName, lang, country, countryCode, articleCountry } = opts;
    if (!modelName) return null;
    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tecdocCall"])("getModelSeries", {
        provider: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_PROVIDER_ID,
        lang,
        country,
        countryCode,
        articleCountry,
        manuId: manufacturerId,
        linkingTargetType: LTT_VEHICLE
    });
    const models = asArray(res?.data?.array).map(normModel).filter((m)=>m.id);
    const wantedSlug = slugify(modelName);
    const wantedLower = (modelName || "").toLowerCase();
    const found = models.find((m)=>m.slug === wantedSlug || (m.name || "").toLowerCase() === wantedLower);
    return found ? Number(found.id) : null;
}
async function GET(req) {
    const url = new URL(req.url);
    const mode = url.searchParams.get("mode");
    // manufacturer: id of naam/alias
    let manufacturerId = toInt(url.searchParams.get("manufacturerId"));
    const manufacturerName = url.searchParams.get("manufacturer") || url.searchParams.get("manuName") || url.searchParams.get("brand");
    // model: id of naam (strikt)
    let modelId = toInt(url.searchParams.get("modelId"));
    const modelName = url.searchParams.get("model") || url.searchParams.get("modelName");
    const ktypNr = toInt(url.searchParams.get("ktypNr")) ?? toInt(url.searchParams.get("kTypNr"));
    // Land/taal defaults uit ENV
    const lang = url.searchParams.get("lang") || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LANG_DEFAULT || "nl";
    const country = url.searchParams.get("country") || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LINKAGE_COUNTRY || "nl";
    const articleCountry = url.searchParams.get("articleCountry") || __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_ARTICLE_COUNTRIES?.[0] || country;
    const countryCode = url.searchParams.get("countryCode") || country;
    const debug = url.searchParams.get("debug");
    // Healthcheck
    if (!mode || mode === "ping") {
        return jsonOK({
            ok: true,
            mode: "ping",
            count: 0,
            data: [],
            meta: {
                message: "vehicles API up",
                vehicleLTT: LTT_VEHICLE,
                engineLTT: LTT_ENGINE
            }
        });
    }
    try {
        switch(mode){
            // -------------------------------------------------------------------
            // Manufacturers (Passenger Car context, LTT=V)
            // -------------------------------------------------------------------
            case "manufacturers":
                {
                    const reqBody = {
                        provider: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_PROVIDER_ID,
                        lang,
                        country,
                        countryCode,
                        articleCountry,
                        linkingTargetType: LTT_VEHICLE
                    };
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logDebug"]?.("[vehicles] getManufacturers", reqBody);
                    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tecdocCall"])("getManufacturers", reqBody);
                    const arr = asArray(res?.data?.array);
                    const list = arr.map(normManu).filter((m)=>m.id && m.name);
                    const meta = maybeAttachDebug(reqBody, debug, res);
                    return jsonOK({
                        ok: true,
                        mode,
                        count: list.length,
                        data: list,
                        meta
                    });
                }
            // -------------------------------------------------------------------
            // Models by manufacturer (id of exacte naam/alias)
            // -------------------------------------------------------------------
            case "models":
                {
                    if (!manufacturerId && manufacturerName) {
                        manufacturerId = await resolveManufacturerId({
                            nameOrAlias: manufacturerName,
                            lang,
                            country,
                            countryCode,
                            articleCountry
                        });
                    }
                    if (!manufacturerId) {
                        return jsonERR({
                            ok: false,
                            mode,
                            error: "Missing manufacturerId (exact name allowed via ?manufacturer=...)"
                        }, 400);
                    }
                    const reqBody = {
                        provider: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_PROVIDER_ID,
                        lang,
                        country,
                        countryCode,
                        articleCountry,
                        manuId: manufacturerId,
                        linkingTargetType: LTT_VEHICLE
                    };
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logDebug"]?.("[vehicles] getModelSeries", reqBody);
                    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tecdocCall"])("getModelSeries", reqBody);
                    const arr = asArray(res?.data?.array);
                    const list = arr.map(normModel).filter((m)=>m.id && m.name);
                    const meta = maybeAttachDebug({
                        ...reqBody,
                        resolvedManufacturerId: manufacturerId
                    }, debug, res);
                    return jsonOK({
                        ok: true,
                        mode,
                        count: list.length,
                        data: list,
                        meta
                    });
                }
            // -------------------------------------------------------------------
            // Types by model (exacte match vereist bij naam-resolve)
            // -------------------------------------------------------------------
            case "types":
                {
                    if (!modelId && modelName) {
                        if (!manufacturerId && manufacturerName) {
                            manufacturerId = await resolveManufacturerId({
                                nameOrAlias: manufacturerName,
                                lang,
                                country,
                                countryCode,
                                articleCountry
                            });
                            if (!manufacturerId) {
                                return jsonERR({
                                    ok: false,
                                    mode,
                                    error: "Manufacturer not found (exact match required)"
                                }, 404);
                            }
                        }
                        if (!manufacturerId) {
                            return jsonERR({
                                ok: false,
                                mode,
                                error: "Missing manufacturerId to resolve modelId"
                            }, 400);
                        }
                        modelId = await resolveModelId({
                            manufacturerId,
                            modelName,
                            lang,
                            country,
                            countryCode,
                            articleCountry
                        });
                        if (!modelId) {
                            return jsonERR({
                                ok: false,
                                mode,
                                error: "Model not found (exact match required for this manufacturer)"
                            }, 404);
                        }
                    }
                    if (!modelId) {
                        return jsonERR({
                            ok: false,
                            mode,
                            error: "Missing modelId (exact model name required if resolving by name)"
                        }, 400);
                    }
                    const reqBody = {
                        provider: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_PROVIDER_ID,
                        lang,
                        country,
                        countryCode,
                        articleCountry,
                        modelId,
                        linkingTargetType: LTT_VEHICLE
                    };
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logDebug"]?.("[vehicles] getVehicleTypesByModel", reqBody);
                    let res;
                    try {
                        res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tecdocCall"])("getVehicleTypesByModel", reqBody);
                    } catch  {
                        res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tecdocCall"])("getTypes", reqBody);
                    }
                    const arr = asArray(res?.data?.array);
                    const list = arr.map(normType).filter((t)=>t.id && (t.name || t.engineCode));
                    const meta = maybeAttachDebug(reqBody, debug, res);
                    return jsonOK({
                        ok: true,
                        mode,
                        count: list.length,
                        data: list,
                        meta
                    });
                }
            // -------------------------------------------------------------------
            // Vehicle details by kTypNr (Passenger Car, LTT=V)
            // -------------------------------------------------------------------
            case "vehicle":
                {
                    if (!ktypNr) return jsonERR({
                        ok: false,
                        mode,
                        error: "Missing ktypNr"
                    }, 400);
                    const reqBody = {
                        provider: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_PROVIDER_ID,
                        lang,
                        country,
                        countryCode,
                        articleCountry,
                        ktypNr,
                        linkingTargetType: LTT_VEHICLE
                    };
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logDebug"]?.("[vehicles] getVehicleByIds", reqBody);
                    let res;
                    try {
                        res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tecdocCall"])("getVehicleByIds", reqBody);
                    } catch  {
                        res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tecdocCall"])("getVehicleDetails", reqBody);
                    }
                    const arr = asArray(res?.data?.array ?? res?.data);
                    const first = arr[0] ?? {};
                    const vehicle = normVehicle(first);
                    const meta = maybeAttachDebug(reqBody, debug, res);
                    return jsonOK({
                        ok: true,
                        mode,
                        count: vehicle?.ktypNr ? 1 : 0,
                        data: vehicle?.ktypNr ? [
                            vehicle
                        ] : [],
                        meta
                    });
                }
            // -------------------------------------------------------------------
            // Engines by model (Engine domain, LTT=M) — exacte model-resolve
            // -------------------------------------------------------------------
            case "engines":
                {
                    if (!modelId && modelName) {
                        if (!manufacturerId && manufacturerName) {
                            manufacturerId = await resolveManufacturerId({
                                nameOrAlias: manufacturerName,
                                lang,
                                country,
                                countryCode,
                                articleCountry
                            });
                            if (!manufacturerId) {
                                return jsonERR({
                                    ok: false,
                                    mode,
                                    error: "Manufacturer not found (exact match required)"
                                }, 404);
                            }
                        }
                        if (!manufacturerId) {
                            return jsonERR({
                                ok: false,
                                mode,
                                error: "Missing manufacturerId to resolve modelId"
                            }, 400);
                        }
                        modelId = await resolveModelId({
                            manufacturerId,
                            modelName,
                            lang,
                            country,
                            countryCode,
                            articleCountry
                        });
                        if (!modelId) {
                            return jsonERR({
                                ok: false,
                                mode,
                                error: "Model not found (exact match required for this manufacturer)"
                            }, 404);
                        }
                    }
                    if (!modelId) {
                        return jsonERR({
                            ok: false,
                            mode,
                            error: "Missing modelId (exact model name required if resolving by name)"
                        }, 400);
                    }
                    const base = {
                        provider: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_PROVIDER_ID,
                        lang,
                        country,
                        countryCode,
                        articleCountry,
                        modelId,
                        linkingTargetType: LTT_ENGINE
                    };
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logDebug"]?.("[vehicles] engines primary payload", base);
                    let res;
                    try {
                        res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tecdocCall"])("getEnginesByModel", base);
                    } catch  {
                        // Fallback via linkage targets
                        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logDebug"]?.("[vehicles] engines fallback linkageTargets", base);
                        res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tecdocCall"])("getLinkageTargets", {
                            provider: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_PROVIDER_ID,
                            linkageTargetCountry: country,
                            lang,
                            linkageTargetType: LTT_ENGINE,
                            vehicleModelSeriesIds: modelId,
                            perPage: 0,
                            page: 1
                        });
                    }
                    const rawList = Array.isArray(res?.data?.linkageTargets) ? res.data.linkageTargets : asArray(res?.data?.array) || [];
                    const list = (rawList || []).map((e)=>{
                        const id = e?.linkageTargetId ?? e?.engineId ?? e?.id ?? e?.typeId ?? null;
                        const name = e?.description ?? e?.engineName ?? e?.typeName ?? e?.name ?? "";
                        const kw = e?.powerKwFrom ?? e?.powerKW ?? e?.engineOutputKw ?? null;
                        const hp = e?.powerHpFrom ?? e?.powerHP ?? e?.engineOutputHp ?? null;
                        const ccm = e?.cylinderCapacity ?? e?.ccm ?? e?.capacityCCM ?? e?.displacementCCM ?? null;
                        const code = e?.engineCode ?? e?.code ?? null;
                        const from = e?.beginYearMonth ?? e?.yearOfConstructionFrom ?? null;
                        const to = e?.endYearMonth ?? e?.yearOfConstructionTo ?? null;
                        return {
                            id: id ? Number(id) : null,
                            name,
                            code,
                            powerKW: kw ? Number(kw) : null,
                            powerHP: hp ? Number(hp) : null,
                            ccm,
                            from,
                            to
                        };
                    }).filter((x)=>x.id);
                    const meta = maybeAttachDebug({
                        ...base,
                        resolvedModelId: modelId
                    }, debug, res);
                    return jsonOK({
                        ok: true,
                        mode,
                        count: list.length,
                        data: list,
                        meta
                    });
                }
            default:
                return jsonERR({
                    ok: false,
                    mode,
                    error: "Unsupported mode"
                }, 400);
        }
    } catch (err) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logError"]?.("Vehicles API error", err);
        const detail = err?.response?.data ?? err?.message ?? (typeof err === "string" ? err : "Unknown error");
        return jsonERR({
            ok: false,
            mode,
            error: "Internal error while fetching data from TecDoc",
            detail
        });
    }
}
async function HEAD() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](null, {
        status: 200
    });
}
async function OPTIONS() {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
    };
    return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](null, {
        status: 204,
        headers
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6adbf479._.js.map