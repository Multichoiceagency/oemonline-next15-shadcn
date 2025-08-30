module.exports = [
"[project]/Documents/oemonline-next15-shadcn/.next-internal/server/app/api/assigned-articles-by-ids/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

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
    TECDOC_DEBUG: (process.env.TECDOC_DEBUG ?? "true") === "true"
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
const TecdocOps = {
    manufacturers: "getManufacturers",
    modelSeries: "getModelSeries",
    modelSeries2: "getModelSeries2",
    types: "getTypes",
    types2: "getTypes2",
    amBrands: "getAmBrands",
    genericArticles: "getGenericArticles",
    genericArticlesByLinkingTarget: "getGenericArticlesByLinkingTarget",
    articleIdsWithState: "getArticleIdsWithState",
    assignedByLinkingTarget: "getAssignedArticlesByLinkingTarget",
    assignedByLinkingTarget2: "getAssignedArticlesByLinkingTarget2",
    assignedByLinkingTarget3: "getAssignedArticlesByLinkingTarget3"
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
const TECDOC_ENDPOINT = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_BASE_JSON || "https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint";
const COMMON_DEFAULTS = {
    lang: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LANG_DEFAULT,
    country: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LINKAGE_COUNTRY,
    countryCode: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LINKAGE_COUNTRY,
    articleCountry: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_ARTICLE_COUNTRIES[0] ?? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LINKAGE_COUNTRY
};
function clean(obj) {
    const out = {};
    for (const [k, v] of Object.entries(obj))if (v != null) out[k] = v;
    return out;
}
function withApiKey(url, key) {
    if (!key) return url;
    return url + (url.includes("?") ? "&" : "?") + "api_key=" + encodeURIComponent(key);
}
async function tecdocCall(resource, payload) {
    const bodyObj = {
        [resource]: clean({
            provider: Number(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_PROVIDER_ID),
            ...COMMON_DEFAULTS,
            ...payload
        })
    };
    const url = withApiKey(TECDOC_ENDPOINT, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_API_KEY);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logDebug"])("REQUEST", {
        resource,
        url,
        body: bodyObj
    });
    const res = await fetch(url, {
        method: "POST",
        headers: clean({
            Accept: "application/json",
            "Content-Type": "application/json",
            ...__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_API_KEY ? {
                "X-Api-Key": __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_API_KEY
            } : {}
        }),
        body: JSON.stringify(bodyObj),
        cache: "no-store"
    });
    let data;
    try {
        data = await res.json();
    } catch  {
        const text = await res.text().catch(()=>"");
        data = {
            status: res.status,
            statusText: text || res.statusText
        };
    }
    if (!res.ok || typeof data?.status === "number" && data.status >= 300) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logError"])("RESPONSE", data ?? {
            status: res.status,
            statusText: res.statusText
        });
        return data ?? {
            status: res.status,
            statusText: res.statusText
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logDebug"])("RESPONSE", data);
    return data;
}
}),
"[project]/Documents/oemonline-next15-shadcn/app/api/assigned-articles-by-ids/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/oemonline-next15-shadcn/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/oemonline-next15-shadcn/lib/tecdoc.ts [app-route] (ecmascript)");
;
;
const dynamic = "force-dynamic";
async function POST(req) {
    const body = await req.json().catch(()=>({}));
    const pairs = Array.isArray(body?.articleIdPairs) ? body.articleIdPairs : [];
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$tecdoc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tecdocCall"])("getAssignedArticlesByIds6", {
        articleIdPairs: {
            array: pairs
        },
        attributs: true,
        basicData: true,
        documents: true,
        eanNumbers: true,
        immediateAttributs: true,
        immediateInfo: true,
        info: true,
        linkingTargetType: body?.linkingTargetType ?? "P",
        linkingTargetId: body?.linkingTargetId ? Number(body.linkingTargetId) : undefined,
        manuId: body?.manuId ? Number(body.manuId) : undefined,
        modId: body?.modId ? Number(body.modId) : undefined,
        normalAustauschPrice: false,
        prices: false,
        replacedByNumbers: false,
        replacedNumbers: false,
        thumbnails: true,
        usageNumbers: false
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data, {
        headers: {
            "Cache-Control": "private, max-age=300"
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d83a70ca._.js.map