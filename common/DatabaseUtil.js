/**
 * Common Database Utility for Intra-mart JSSP
 * Refactored to use load() pattern.
 */
var db = new TenantDatabase();

var DatabaseUtil = {
    /**
     * Execute a query using a SQL template file (.sql)
     */
    execute: function(queryPath, params) {
        try {
            var res = db.executeByTemplate(queryPath, params || {});
            return {
                data: res.data,
                error: res.error,
                errorMessage: res.message || ""
            };
        } catch (e) {
            return { data: [], error: true, errorMessage: e.message };
        }
    },

    /**
     * Execute a raw SELECT query string.
     */
    executeQuery: function(sql, params) {
        try {
            var res = db.select(sql, params || []);
            return {
                data: res.data,
                error: res.error,
                errorMessage: res.message || ""
            };
        } catch (e) {
            return { data: [], error: true, errorMessage: e.message };
        }
    },

    /**
     * Parameter wrappers
     */
    p: {
        s: function(v) { return DbParameter.string(v); },
        n: function(v) { return DbParameter.number(v); },
        d: function(v) { return DbParameter.date(v); },
        t: function(v) { return DbParameter.timestamp(v || new Date()); }
    }
};
