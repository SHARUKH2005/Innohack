import { Request, Response } from "express";
import { supabase } from "../config/supabase";
import { mxTokenContract } from "../config/blockchain";
import { ethers } from "ethers";

export async function getUsers(req: Request, res: Response) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .limit(20);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data || []);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, wallet_address, role } = req.body;

    const { data, error } = await supabase
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
  } catch (error) {
    res.status(500).json({
      error: "Server error"
    });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

export async function getUserBalance(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const { data: user, error } = await supabase
      .from("users")
      .select("wallet_address")
      .eq("id", userId)
      .single();

    if (error || !user?.wallet_address) {
      return res.json({ balance: "0", wallet_address: null });
    }

    try {
      const balanceWei = await mxTokenContract.balanceOf(user.wallet_address);
      const balanceFormatted = ethers.formatEther(balanceWei);
      return res.json({
        balance: balanceFormatted,
        wallet_address: user.wallet_address
      });
    } catch (blockchainErr) {
      console.warn("Blockchain RPC read notice:", blockchainErr);
      
      // Fallback: sum rewards from database if RPC is slow
      const { data: rewards } = await supabase
        .from("rewards")
        .select("amount")
        .eq("user_id", userId);

      const dbTotal = rewards ? rewards.reduce((sum, r) => sum + Number(r.amount || 0), 0) : 0;
      return res.json({
        balance: String(dbTotal),
        wallet_address: user.wallet_address,
        source: "database"
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user balance" });
  }
}
