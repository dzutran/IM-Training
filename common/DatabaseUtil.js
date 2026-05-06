/**
 * Common Database Utility for Intra-mart JSSP
 * Purpose: Centralize DB connection and provide helper methods for CRUD operations.
 * Database: imart_v8
 */

var DatabaseUtil = (function() {
    var SCHEMA = 'imart_v8';
    var db = new SharedDatabase(SCHEMA);
    
    return {
        /**
         * Execute a query using a SQL template file.
         * @param {string} queryPath Path to the .sql file (without extension)
         * @param {Object} params Parameters to bind
         * @returns {Object} { data: Array, error: boolean, message: string }
         */
        execute: function(queryPath, params) {
            try {
                var res = db.executeByTemplate(queryPath, params || {});
                if (res.error) {
                    Debug.console("DatabaseUtil.execute DB Error [" + queryPath + "]: " + res.message);
                }
                return {
                    data: res.data,
                    error: res.error,
                    message: res.message || ""
                };
            } catch (e) {
                Debug.console("DatabaseUtil.execute Exception at [" + queryPath + "]: " + e.message);
                return {
                    data: [],
                    error: true,
                    message: e.message
                };
            }
        },

        /**
         * Get common audit fields (createdAt, createdBy, updatedAt, updatedBy)
         * @param {boolean} isUpdate If true, only returns update fields.
         * @returns {Object} Object with DbParameter values
         */
        getAuditParams: function(isUpdate) {
            var user = Contexts.getAccountContext();
            var now = new Date();
            var userCd = user.userCd;
            var params = {
                updatedAt: DbParameter.timestamp(now),
                updatedBy: DbParameter.string(userCd)
            };
            
            if (!isUpdate) {
                params.createdAt = DbParameter.timestamp(now);
                params.createdBy = DbParameter.string(userCd);
            }
            
            return params;
        },

        /**
         * Parameter wrappers for cleaner code
         */
        p: {
            s: function(v) { return DbParameter.string(v); },
            n: function(v) { return DbParameter.number(v); },
            d: function(v, fmt) { 
                if (typeof v === 'string' && v) return DbParameter.date(Format.toDate(fmt || 'yyyy/MM/dd', v));
                return DbParameter.date(v || null);
            },
            t: function(v) { return DbParameter.timestamp(v || new Date()); }
        }
    };
})();
