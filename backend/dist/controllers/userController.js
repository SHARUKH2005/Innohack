"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
const supabase_1 = require("../config/supabase");
async function createUser(req, res) {
    try {
        const { name, email, wallet_address, role } = req.body;
        const { data, error } = await supabase_1.supabase
            .from("users")
            .insert({
            name,
            email,
            wallet_address,
            role: role || "learner"
        })
            .select()
            .single();
        if (error) {
            return res.status(400).json({
                error: error.message
            });
        }
        res.status(201).json(data);
    }
    catch (error) {
        res.status(500).json({
            error: "Server error"
        });
    }
}
