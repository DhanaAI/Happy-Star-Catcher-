
# Happy Star Catcher — Kids Game + NFT Scaffold

This package contains a super-simple HTML5 game suitable for young children **and** a ready-to-use NFT scaffold for your game accessories.

## What's inside

```
kids-game-nft/
├─ game/
│  ├─ index.html
│  ├─ styles.css
│  ├─ config.js
│  ├─ game.js
│  └─ assets/
│     ├─ star.svg
│     ├─ hat.svg
│     ├─ glasses.svg
│     └─ wand.svg
└─ nft/
   ├─ images/ (same SVGs for NFTs)
   └─ metadata/ (ERC-721 metadata JSONs)
```

## How to run the game locally

1. Open `game/index.html` in any modern browser (Chrome, Edge, Firefox, Safari).
2. Click **Play** and tap/click the stars to collect them.
3. Equip items from the **Items** panel. Items are cosmetic.
4. The **OpenSea** button links to your collection URL (set in `config.js`).

## Host the game for outsiders

**Option A: GitHub Pages (free)**  
- Create a GitHub repo.  
- Put the `game/` folder contents at the repo root.  
- In GitHub, go to **Settings → Pages**, choose **Deploy from Branch** (usually `main`), and select `/ (root)` folder.  
- You will get a public URL like `https://yourname.github.io/repo`, which you can share.

**Option B: Netlify / Vercel (free tiers)**  
- Drag-drop the `game/` folder into Netlify Drop or connect the repo.  
- Get an instant public URL.

**Option C: itch.io (free)**  
- Create a new project and upload the `game/` folder as an HTML5 game.

## Create NFTs (free to start) and list on OpenSea

You can use **OpenSea** to create a collection on Polygon and "lazy mint" items (low or no upfront gas). Steps:

1. Create a wallet (e.g., MetaMask) and make sure Polygon is enabled.  
2. On OpenSea, create a **Collection** (choose Polygon to minimize fees).  
3. For each accessory (Magic Hat, Super Glasses, Sparkle Wand):
   - Upload the matching SVG from `nft/images/`.
   - Name, description, and attributes are in `nft/metadata/*.json` (copy/paste fields).
   - List item for sale (fixed price).

4. Copy your collection URL and paste it into `game/config.js` as `openseaCollectionUrl`.

> Note: For best practice, host the images and metadata on IPFS (e.g., nft.storage, Pinata). Replace the `image` URLs in the metadata with your IPFS links before minting.

## Optional: Gating items by NFT ownership

This starter keeps items cosmetic (no gating). If you want to **unlock items only when the connected wallet owns the NFT**, you can:

- Use a wallet library (ethers.js) to connect MetaMask.
- Read NFT ownership from chain (token contract + tokenId).  
- Enable the **Equip** button only if ownership is confirmed.

This requires a bit more coding and a specific contract address/token IDs, which vary by how you mint the NFTs.

## Customize

- Edit `GAME_CONFIG` in `game/config.js` to change the title, collection URL, or items.
- Replace SVGs in `game/assets/` and `nft/images/` with your own art.
- Adjust colors or difficulty in `game/game.js` (spawn rate, star speed, canvas size).

## Support

If you want me to wire up wallet connect and ownership checks or prepare an IPFS pinning-ready bundle, tell me the blockchain/network and your collection details and I'll adapt the code.
