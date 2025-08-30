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

// lib/env.ts
__turbopack_context__.s([
    "ENV",
    ()=>ENV
]);
const ENV = {
    TECDOC_PROVIDER_ID: Number(process.env.TECDOC_PROVIDER_ID || 0),
    TECDOC_API_KEY: process.env.TECDOC_API_KEY || "",
    TECDOC_LANG_DEFAULT: (process.env.TECDOC_LANG_DEFAULT || "nl").toLowerCase(),
    TECDOC_LANGS: (process.env.TECDOC_LANGS || "nl").split(",").map((s)=>s.trim().toLowerCase()),
    TECDOC_ARTICLE_COUNTRIES: (process.env.TECDOC_ARTICLE_COUNTRIES || "nl,be,lu").split(",").map((s)=>s.trim().toLowerCase()),
    TECDOC_LINKAGE_COUNTRY: (process.env.TECDOC_LINKAGE_COUNTRY || "nl").toLowerCase(),
    TECDOC_BASE_JSON: process.env.TECDOC_BASE_JSON || "https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint",
    TECDOC_PLATE_ENABLED: /^true$/i.test(process.env.TECDOC_PLATE_ENABLED || "false"),
    TECDOC_PLATE_COUNTRY: (process.env.TECDOC_PLATE_COUNTRY || "nl").toLowerCase()
};
}),
"[project]/Documents/oemonline-next15-shadcn/lib/logger.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ // lib/logger.ts
__turbopack_context__.s([
    "logDebug",
    ()=>logDebug,
    "logError",
    ()=>logError,
    "logInfo",
    ()=>logInfo
]);
function logDebug(msg, data) {
    try {
        console.debug(`[TecDoc] ${msg}`, data ?? "");
    } catch  {}
}
function logInfo(msg, data) {
    try {
        console.info(`[TecDoc] ${msg}`, data ?? "");
    } catch  {}
}
function logError(msg, data) {
    try {
        console.error(`[TecDoc] ${msg}`, data ?? "");
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
    // Plate (let op: sommige tenants vereisen extra keySystemNumber)
    vehiclesByPlate: "getVehiclesByKeyNumberPlates",
    // Brands
    amBrands: "getAmBrands",
    // Categories (Generic Articles)
    genericArticles: "getGenericArticles",
    genericArticlesByLinkingTarget: "getGenericArticlesByLinkingTarget",
    // Article IDs / staat
    articleIdsWithState: "getArticleIdsWithState",
    // Assigned articles (producten) voor voertuig
    assignedByLinkingTarget: "getAssignedArticlesByLinkingTarget",
    assignedByLinkingTarget2: "getAssignedArticlesByLinkingTarget2",
    assignedByLinkingTarget3: "getAssignedArticlesByLinkingTarget3",
    assignedByIds6: "getAssignedArticlesByIds6",
    // Article details / media (varianten verschillen per tenant)
    articleSearchByTerm: "articleSearchByTerm",
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
const TECDOC_ENDPOINT = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_BASE_JSON || "https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint";
/** Veel voorkomende defaultvelden – worden per call toegevoegd tenzij overschreven. */ const COMMON_DEFAULTS = {
    lang: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LANG_DEFAULT,
    country: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LINKAGE_COUNTRY,
    countryCode: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LINKAGE_COUNTRY,
    articleCountry: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_ARTICLE_COUNTRIES[0] ?? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_LINKAGE_COUNTRY
};
/** Verwijdert undefined/null waarden uit een object. */ function clean(obj) {
    const out = {};
    for (const [k, v] of Object.entries(obj)){
        if (v === undefined || v === null) continue;
        out[k] = v;
    }
    return out;
}
/** Plakt ?api_key=... (of &api_key=...) aan de endpoint-URL als die nog niet aanwezig is. */ function withApiKey(url, apiKey) {
    if (!apiKey) return url;
    const hasQuery = url.includes("?");
    return url + (hasQuery ? "&" : "?") + "api_key=" + encodeURIComponent(apiKey);
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
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_API_KEY ? {
                "X-Api-Key": __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV"].TECDOC_API_KEY
            } : {}
        },
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
    // TecDoc zet vaak {status,statusText} in de payload; behandel dat als fout.
    if (!res.ok || typeof data?.status === "number" && data.status >= 300) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logError"])("RESPONSE", data ?? {
            status: res.status,
            statusText: res.statusText
        });
        // Geef de TecDoc payload terug zodat de caller status/statusText kan tonen/loggen.
        return data ?? {
            status: res.status,
            statusText: res.statusText
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$oemonline$2d$next15$2d$shadcn$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logDebug"])("RESPONSE", data);
    return data;
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