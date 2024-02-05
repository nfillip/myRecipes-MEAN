import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const recipeRouter = express.Router();
recipeRouter.use(express.json());

recipeRouter.get("/", async (_req, res) => {
    try {
        const recipes = await collections.recipes.find({}).toArray();
        res.status(200).send(recipes);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

recipeRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const recipe = await collections.recipes.findOne(query);

        if (recipe) {
            res.status(200).send(recipe);
        } else {
            res.status(404).send(`Failed to find a recipe: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find a recipe: ID ${req?.params?.id}`);
    }
});

recipeRouter.post("/", async (req, res) => {
    try {
        const recipe = req.body;
        const result = await collections.recipes.insertOne(recipe);

        if (result.acknowledged) {
            res.status(201).send(`Created a new recipe: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new recipe.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

recipeRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const recipe = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.recipes.updateOne(query, { $set: recipe });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated a recipe: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find a recipe: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a recipe: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

recipeRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.recipes.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed a recipe: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a recipe: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a recipe: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
