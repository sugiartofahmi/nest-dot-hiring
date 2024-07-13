"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var base_entity_1 = require("../base/base.entity");
exports.users = (0, pg_core_1.pgTable)('users', __assign({ fullName: (0, pg_core_1.text)('full_name').notNull(), email: (0, pg_core_1.text)('email').unique().notNull(), password: (0, pg_core_1.text)('password').notNull() }, base_entity_1.base));
