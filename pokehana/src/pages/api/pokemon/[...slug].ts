// src/pages/api/pokemon/[...slug].ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_POKEMON_URL || "";
const apiKey = process.env.POKEMON_API_KEY || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // slug is an array of the path parts after /api/pokemon/
    // e.g. ["cards"] or ["sets", "123"]
    const slug = req.query.slug as string[] | undefined;

    if (!slug) {
      return res.status(400).json({ message: "Missing API path" });
    }

    // join slug parts to create path, e.g. "cards" or "sets/123"
    const endpointPath = "/" + slug.join("/");

    // remove slug from query so we don't send it to API as param
    const { slug: _, ...query } = req.query;

    // forward the request to the Pokémon TCG API
    const response = await axios.request({
      url: `${API_BASE_URL}${endpointPath}`,
      method: req.method,
      params: query,
      data: req.body,
      headers: {
        "X-Api-Key": apiKey,
      },
    });

    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || error.message,
    });
  }
}
