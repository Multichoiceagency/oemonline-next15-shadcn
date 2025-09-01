module.exports = [
"[project]/Documents/oemonline-next15-shadcn/.next-internal/server/app/api/plates/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[project]/Documents/oemonline-next15-shadcn/app/api/plates/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ // app/api/plates/route.ts
__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/oemonline-next15-shadcn/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/oemonline-next15-shadcn/lib/env.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/oemonline-next15-shadcn/lib/tecdoc.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/oemonline-next15-shadcn/lib/logger.ts [app-route] (ecmascript)");
;
;
;
;
const dynamic = "force-dynamic";
// NL kenteken normaliseren: G-428-FK -> G428FK
function normalizePlate(raw) {
    return String(raw || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}
// keySystemType mapping o.b.v. TecAlliance guide (VRM/KBA/etc.)
const KEY_SYSTEM_TYPE = {
    nl: 1,
    de: 20,
    fr: 50,
    gb: 99,
    ie: 99,
    it: 50,
    pt: 50,
    dk: 95,
    fi: 95,
    se: 95,
    no: 95,
    is: 10,
    au: 75,
    nz: 75,
    at: 6,
    ch: 4,
    br: 100,
    mt: 99,
    es: 99
};
async function GET(req) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_PLATE_ENABLED) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Plate lookup disabled"
        }, {
            status: 503
        });
    }
    const plateRaw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["qp"])(req, "plate");
    const country = ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["qp"])(req, "country", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_PLATE_COUNTRY) || "nl").toLowerCase();
    const lang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["qp"])(req, "lang", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LANG_DEFAULT);
    if (!plateRaw) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Missing plate"
        }, {
            status: 400
        });
    }
    const keySystemNumber = normalizePlate(plateRaw);
    const keySystemCountry = country.toUpperCase();
    const keySystemType = KEY_SYSTEM_TYPE[country] ?? 1 // default NL VRM
    ;
    // Gemeenschappelijke velden
    const common = {
        lang,
        country,
        countryCode: country,
        articleCountry: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_ARTICLE_COUNTRIES[0],
        linkingTargetType: "P",
        page: 1,
        perPage: 25
    };
    // We proberen een paar varianten, want de JSON binding kan per tenant verschillen
    const attempts = [
        {
            note: "flat keySystem* fields",
            payload: {
                ...common,
                keySystemNumber,
                keySystemCountry,
                keySystemType
            }
        },
        {
            note: "nested keySystem object",
            payload: {
                ...common,
                keySystem: {
                    number: keySystemNumber,
                    country: keySystemCountry,
                    type: keySystemType
                }
            }
        }
    ];
    let lastResp = null;
    try {
        for (const a of attempts){
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logDebug"])("[TecDoc] REQUEST", {
                resource: "getVehiclesByKeyNumberPlates",
                url: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_BASE_JSON,
                body: {
                    getVehiclesByKeyNumberPlates: a.payload
                }
            });
            const resp = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tecdocCall"])("getVehiclesByKeyNumberPlates", a.payload);
            lastResp = resp;
            // Als TecDoc een status veld terugstuurt, check het:
            if (resp?.status && resp.status >= 300) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logError"])("[TecDoc][PLATE_STATUS]", resp);
                continue;
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logDebug"])("[TecDoc] RESPONSE OK (plates)", {
                attempt: a.note
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(resp, {
                headers: {
                    "Cache-Control": "private, max-age=300"
                }
            });
        }
        // Alle pogingen gaven error
        const status = lastResp?.status ?? 502;
        const statusText = lastResp?.statusText || "TecDoc error";
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logError"])("[TecDoc][PLATE_FAILED]", lastResp);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: statusText,
            tecdoc: lastResp
        }, {
            status
        });
    } catch (e) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logError"])("[TecDoc][PLATE_EXCEPTION]", {
            message: String(e?.message || e)
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Kenteken lookup faalde"
        }, {
            status: 502
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9cbcddda._.js.map