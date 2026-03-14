import fs from "fs";
import path from "path";

const ROOT = "posts";

function encodePathSegment(name) {
    return encodeURIComponent(name).replace(/%2F/g, "/");
}

function readDescription(dir) {
    const indexPath = path.join(dir, "index.md");
    if (!fs.existsSync(indexPath)) return "";
    const firstLine = fs.readFileSync(indexPath, "utf8").split("\n")[0].trim();
    if (firstLine.startsWith("#")) {
        return firstLine.replace(/^#\s*/, "");
    }
    return "";
}

function generateIndex(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    const subdirs = items
        .filter((d) => d.isDirectory() && !d.name.startsWith("."))
        .map((d) => d.name);

    const files = items
        .filter(
            (d) =>
                d.isFile() && d.name.endsWith(".md") && d.name !== "index.md",
        )
        .map((d) => d.name);

    const title = path.basename(dir);

    const lines = [];

    lines.push("---");
    lines.push("prev: false");
    lines.push("next: false");
    lines.push("---");
    lines.push("");

    lines.push(`# ${title}`);
    lines.push("");

    lines.push(`<div class="folder-grid">`);
    lines.push("");

    // 文件夹卡片
    for (const sub of subdirs) {
        const subPath = path.join(dir, sub);
        const desc = readDescription(subPath) || "文件夹";
        const encoded = encodePathSegment(sub);

        lines.push(`<a class="folder-card folder-type" href="./${encoded}/">`);
        lines.push(`  <div class="icon">📁</div>`);
        lines.push(`  <div class="title">${sub}</div>`);
        lines.push(`  <div class="desc">${desc}</div>`);
        lines.push(`</a>`);
        lines.push("");
    }

    // 文件卡片
    for (const file of files) {
        const name = file.replace(".md", "");
        // const encoded = encodePathSegment(file);
        const encoded = encodePathSegment(name);
        lines.push(`<a class="folder-card file-type" href="./${encoded}">`);
        lines.push(`  <div class="icon">📄</div>`);
        lines.push(`  <div class="title">${name}</div>`);
        lines.push(`</a>`);
        lines.push("");
    }

    lines.push(`</div>`);
    lines.push("");

    const indexPath = path.join(dir, "index.md");
    fs.writeFileSync(indexPath, lines.join("\n"), "utf8");

    console.log("Generated:", indexPath);

    for (const sub of subdirs) {
        generateIndex(path.join(dir, sub));
    }
}

generateIndex(ROOT);
