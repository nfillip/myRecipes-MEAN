const recipeSeed = require("./recipeSeed.json");
import {collections} from "../database";

collections.recipes.create(recipeSeed);