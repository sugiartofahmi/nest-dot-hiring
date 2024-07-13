"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
exports.base = {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
};
