import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const actionsDir = path.resolve(__dirname, '../actions');
const publicDir = path.resolve(__dirname, '../public');

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

const actionsList = [];

if (fs.existsSync(actionsDir)) {
    const dirs = fs.readdirSync(actionsDir);
    for (const dir of dirs) {
        const actionJsonPath = path.join(actionsDir, dir, 'action.json');
        if (fs.existsSync(actionJsonPath)) {
            try {
                // Read and add to index
                const actionData = JSON.parse(fs.readFileSync(actionJsonPath, 'utf8'));
                actionsList.push({
                    id: dir,
                    name: actionData.name,
                    description: actionData.description,
                    icon: actionData.icon || 'Zap',
                    capabilities: actionData.capabilities || [],
                    author: actionData.author || 'Anonymous'
                });
                
                // Copy the JSON to public directory so Vite bundles it
                const publicActionDir = path.join(publicDir, 'actions', dir);
                if (!fs.existsSync(publicActionDir)) {
                    fs.mkdirSync(publicActionDir, { recursive: true });
                }
                fs.copyFileSync(actionJsonPath, path.join(publicActionDir, 'action.json'));
                
            } catch (err) {
                console.error(`Failed to parse ${actionJsonPath}:`, err);
            }
        }
    }
}

fs.writeFileSync(path.join(publicDir, 'actions-index.json'), JSON.stringify(actionsList, null, 2));
console.log(`Successfully built actions-index.json with ${actionsList.length} actions.`);
