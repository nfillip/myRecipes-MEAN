"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recipeSeed = require("./recipeSeed.json");
const database_1 = require("../database");
database_1.collections.recipes.create(recipeSeed);
//# sourceMappingURL=seed.js.map