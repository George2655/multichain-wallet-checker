export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const apiKey = process.env.ALCHEMY_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "ALCHEMY_API_KEY is not configured"
    });
  }

  const { addresses, networks } = req.body || {};

  if (!Array.isArray(addresses) || addresses.length === 0) {
    return res.status(400).json({
      error: "addresses must be a non-empty array"
    });
  }

  if (addresses.length > 30) {
    return res.status(400).json({
      error: "Maximum 30 addresses per request"
    });
  }

  const evmAddressRegex = /^0x[a-fA-F0-9]{40}$/;

  const uniqueAddresses = [
    ...new Set(
      addresses
        .map(address => String(address).trim())
        .filter(address => evmAddressRegex.test(address))
    )
  ];

  if (uniqueAddresses.length === 0) {
    return res.status(400).json({
      error: "No valid EVM addresses provided"
    });
  }

  const defaultNetworks = [
    "eth-mainnet",
    "base-mainnet",
    "arb-mainnet",
    "opt-mainnet",
    "matic-mainnet"
  ];

  const selectedNetworks =
    Array.isArray(networks) && networks.length
      ? networks
      : defaultNetworks;

  const requestBody = {
    addresses: uniqueAddresses.map(address => ({
      address,
      networks: selectedNetworks
    })),

    withMetadata: true,
    withPrices: true,
    includeNativeTokens: true,
    includeErc20Tokens: true,
    includeBlockMetadata: false
  };

  try {
    const response = await fetch(
      `https://api.g.alchemy.com/data/v1/${apiKey}/assets/tokens/by-address`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Alchemy request failed",
        details: data
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch portfolio data",
      message: error.message
    });
  }
}
