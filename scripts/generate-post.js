const fs = require("fs");
const path = require("path");

function generatePost(title, excerpt, coverImage) {
  const header = `---
title: "${title}"
excerpt: "${excerpt}"
coverImage: "${coverImage}"
date: "${new Date().toISOString()}"
author:
  name: "홍준혁"
  picture: "/assets/blog/authors/liam.jpeg"
  description: "변경사항에 유연하게 대처하기 위한 코드 설계에 관심이 많습니다."
ogImage:
  url: "${coverImage}"
---
`;

  return header;
}

const title = process.argv[2] || "Default Title";
const excerpt = process.argv[3] || "Default Excerpt";
const coverImage = process.argv[4] || "/assets/default-cover.png";

const filename = `${title.toLowerCase().replace(/ /g, "_")}.md`;
const rootDir = process.cwd();
const outputPath = path.join(rootDir, "_posts", filename);
const postContent = generatePost(title, excerpt, coverImage);

fs.writeFileSync(outputPath, postContent, "utf-8");

console.log(`Post가 생성되었습니다 : ${outputPath}`);
