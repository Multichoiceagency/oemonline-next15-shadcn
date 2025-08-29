module.exports = [
"[project]/Documents/oemonline-next15-shadcn/.next-internal/server/app/api/categories/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

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

__turbopack_context__.s([
    "ENV",
    ()=>ENV,
    "req",
    ()=>req
]);
function req(name, fallback) {
    const v = process.env[name] ?? fallback;
    if (!v) throw new Error(`Missing env: ${name}`);
    return v;
}
const ENV = {
    // TecDoc
    TECDOC_PROVIDER_ID: req("TECDOC_PROVIDER_ID"),
    TECDOC_API_KEY: req("TECDOC_API_KEY"),
    TECDOC_LANG_DEFAULT: req("TECDOC_LANG_DEFAULT", "nl"),
    TECDOC_LANGS: req("TECDOC_LANGS", "nl,fr").split(","),
    TECDOC_ARTICLE_COUNTRIES: req("TECDOC_ARTICLE_COUNTRIES", "nl,be,lu").split(","),
    TECDOC_LINKAGE_COUNTRY: req("TECDOC_LINKAGE_COUNTRY", "nl"),
    TECDOC_BASE_JSON: req("TECDOC_BASE_JSON"),
    TECDOC_PLATE_ENABLED: (process.env.TECDOC_PLATE_ENABLED ?? "true") === "true",
    TECDOC_PLATE_COUNTRY: req("TECDOC_PLATE_COUNTRY", "nl"),
    TECDOC_DOWNLOAD_IMAGES: (process.env.TECDOC_DOWNLOAD_IMAGES ?? "true") === "true",
    TECDOC_DEBUG: (process.env.TECDOC_DEBUG ?? "false") === "true"
};
}),
"[project]/Documents/oemonline-next15-shadcn/lib/logger.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_context__.s([
    "logDebug",
    ()=>logDebug,
    "logError",
    ()=>logError
]);
function logDebug(label, payload) {
    try {
        // Keep logs compact but structured
        // eslint-disable-next-line no-console
        console.log(`[TecDoc] ${label}:`, JSON.stringify(payload));
    } catch  {
    // ignore
    }
}
function logError(label, payload) {
    try {
        // eslint-disable-next-line no-console
        console.error(`[TecDoc][ERROR] ${label}:`, JSON.stringify(payload));
    } catch  {
    // ignore
    }
}
}),
"[project]/Documents/oemonline-next15-shadcn/lib/tecdoc.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_context__.s([
    "TecdocHttpError",
    ()=>TecdocHttpError,
    "TecdocOps",
    ()=>TecdocOps,
    "qp",
    ()=>qp,
    "tecdocCall",
    ()=>tecdocCall
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/oemonline-next15-shadcn/lib/env.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/oemonline-next15-shadcn/lib/logger.ts [app-route] (ecmascript)");
;
;
const TecdocOps = {
    // search
    searchTerm: "articleSearchByTerm",
    // VRM / VIN / Motor
    byPlate: "getVehiclesByKeyNumberPlates",
    byVin: "getVehiclesByVIN",
    byMotorId: "getVehicleIdsByMotor2",
    // Vehicle reference (names differ per tenant; swap to your exact ops if needed)
    manufacturers: "getManufacturers",
    models: "getModelSeries",
    types: "getVehicleIdsByCriteria",
    // Catalog
    genericArticles: "getGenericArticles",
    // Articles
    articleById: "getArticleDirectSearchById",
    articleImages: "getArticleImages"
};
async function tecdocCall(resource, params = {}, init) {
    const controller = new AbortController();
    const timeout = setTimeout(()=>controller.abort(), 15000);
    const body = {
        provider: Number(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_PROVIDER_ID),
        locale: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LANG_DEFAULT,
        country: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LINKAGE_COUNTRY,
        resource,
        // "defensive" params for common variations
        lang: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LANG_DEFAULT,
        countryCode: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LINKAGE_COUNTRY,
        articleCountry: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_ARTICLE_COUNTRIES,
        ...params
    };
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_DEBUG) (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logDebug"])("REQUEST", {
        url: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_BASE_JSON,
        body
    });
    try {
        const res = await fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_BASE_JSON, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "X-Api-Key": __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_API_KEY
            },
            body: JSON.stringify(body),
            signal: controller.signal,
            ...init
        });
        clearTimeout(timeout);
        const text = await res.text();
        const json = safeJson(text);
        if (!res.ok) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logError"])("RESPONSE", {
                status: res.status,
                statusText: res.statusText,
                body: text
            });
            throw new TecdocHttpError(resource, res.status, res.statusText, text);
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_DEBUG) (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logDebug"])("RESPONSE", {
            status: res.status,
            jsonSummary: summarize(json)
        });
        return json;
    } catch (err) {
        if (err?.name === "AbortError") {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logError"])("TIMEOUT", {
                resource
            });
            throw new TecdocHttpError(resource, 504, "Timeout", "Request timed out");
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logError"])("FETCH_ERROR", {
            resource,
            message: String(err?.message || err)
        });
        throw err;
    }
}
class TecdocHttpError extends Error {
    resource;
    status;
    statusText;
    rawBody;
    constructor(resource, status, statusText, rawBody){
        super(`TecDoc ${resource} ${status}: ${statusText}`), this.resource = resource, this.status = status, this.statusText = statusText, this.rawBody = rawBody;
    }
}
function safeJson(text) {
    try {
        return JSON.parse(text);
    } catch  {
        return {
            raw: text
        };
    }
}
function summarize(obj) {
    try {
        if (!obj) return obj;
        const status = obj.status ?? obj.Status ?? undefined;
        const hasData = obj.data || obj.Data || obj.result || obj.Result;
        const len = Array.isArray(hasData?.array) ? hasData.array.length : undefined;
        return {
            status,
            hasData: !!hasData,
            len
        };
    } catch  {
        return undefined;
    }
}
function qp(req, key, dflt) {
    const url = new URL(req.url);
    return (url.searchParams.get(key) ?? dflt)?.trim();
}
}),
"[project]/Documents/oemonline-next15-shadcn/app/api/categories/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/categories/route.ts
__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/oemonline-next15-shadcn/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/oemonline-next15-shadcn/lib/tecdoc.ts [app-route] (ecmascript)");
;
;
const dynamic = "force-dynamic";
async function GET(req) {
    const op = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["qp"])(req, "operation", __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TecdocOps"].genericArticles) ?? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TecdocOps"].genericArticles;
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tecdocCall"])(op, {});
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data, {
        headers: {
            "Cache-Control": "public, max-age=86400"
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__52df008a._.js.map